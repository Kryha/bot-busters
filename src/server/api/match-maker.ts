import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";
import { sql } from "drizzle-orm";

import {
  CHAT_TIME_MS,
  MATCH_TIME_MS,
  POINTS_BOT_BUSTED,
  POINTS_USER_BUSTED,
  VOTING_TIME_MS,
} from "~/constants/main.js";
import { env } from "~/env.mjs";
import { db } from "~/server/db/index.js";
import { matches as matchesTable, users } from "~/server/db/schema.js";

import type {
  CharacterId,
  MatchEventType,
  MatchRoom,
  PlayerType as Player,
  ReadyToPlayPayload,
} from "./match-types.js";

export const ee = new EventEmitter();

export const lobbyQueue: string[] = [];

export const matches = new Map<string, MatchRoom>();

export const matchEvent = (
  roomId: string,
  eventType: MatchEventType = "message"
) => {
  return `chat_${roomId}_${eventType}`;
};

const generatePlayer = (
  userId: string,
  availableIds: CharacterId[]
): Player => {
  const characterId = availableIds.pop();

  if (!characterId) throw new Error("User generation failed: too many players");

  return {
    userId,
    characterId,
    score: 0,
    isBot: false, // TODO: set to correct value
    isScoreSaved: false,
    botsBusted: 0,
    correctGuesses: 0,
  };
};

const makeMatch = () => {
  if (lobbyQueue.length < env.PLAYERS_PER_MATCH) return;

  const availableCharacterIds: CharacterId[] = ["1", "2", "3", "4", "5"];

  if (availableCharacterIds.length < env.PLAYERS_PER_MATCH) {
    throw new Error(
      "Match making error: characters amount is lower than the amount of players per match"
    );
  }

  const playerIds = lobbyQueue.splice(0, env.PLAYERS_PER_MATCH);

  const roomId = uuid();

  matches.set(roomId, {
    players: playerIds.map((id) => generatePlayer(id, availableCharacterIds)),
    messages: [],
    stage: "chat",
    arePointsCalculated: false,
    createdAt: Date.now(),
    votingAt: Date.now() + CHAT_TIME_MS,
  });

  ee.emit("readyToPlay", {
    roomId,
    players: playerIds,
  } satisfies ReadyToPlayPayload);
  ee.emit("queueUpdate");
};

const updateRooms = () => {
  matches.forEach((room, roomId) => {
    const roomAge = Date.now() - room.createdAt;

    if (roomAge >= MATCH_TIME_MS) {
      matches.delete(roomId);
      return;
    }

    if (room.stage === "chat" && roomAge >= CHAT_TIME_MS) {
      room.stage = "voting";
      ee.emit(matchEvent(roomId, "stageChange"));
    }

    if (room.stage === "voting" && roomAge >= CHAT_TIME_MS + VOTING_TIME_MS) {
      room.stage = "results";

      // score calculation
      const players = room.players.map((player) => {
        let score = 0;
        let correctGuesses = 0;
        let botsBusted = 0;

        const otherPlayers = room.players.filter(
          (p) => p.userId !== player.userId
        );

        if (player.votes) {
          otherPlayers.forEach((p) => {
            const isVoted = player.votes!.includes(p.userId);
            const hasGuessed = p.isBot ? isVoted : !isVoted;

            if (hasGuessed) {
              correctGuesses += 1;

              if (p.isBot) {
                botsBusted += 1;
                score += POINTS_BOT_BUSTED;
              } else {
                score += POINTS_USER_BUSTED;
              }
            }
          });
        }

        return { ...player, score, correctGuesses, botsBusted };
      });

      matches.set(roomId, {
        ...room,
        players,
        stage: "results",
        arePointsCalculated: true,
      });
      ee.emit(matchEvent(roomId, "stageChange"));
    }
  });
};

const saveScore = async () => {
  const roomsToArchive = new Map<string, MatchRoom>();

  const promises = Array.from(matches.entries()).flatMap(([roomId, room]) => {
    if (room.stage !== "results" || !room.arePointsCalculated) return;
    roomsToArchive.set(roomId, room);

    return room.players.map(async (player) => {
      try {
        if (player.isScoreSaved) return;
        player.isScoreSaved = true;
        await db.execute(
          sql`UPDATE ${users} SET score = score + ${player.score} WHERE ${users.id} = ${player.userId}`
        );
      } catch (error) {
        player.isScoreSaved = false;
        roomsToArchive.delete(roomId);
        console.error("Score update error:", error);
      }
    });
  });

  try {
    await Promise.all(promises);

    const roomsToStore = Array.from(roomsToArchive.entries()).reduce(
      (acc, [roomId, room]) => {
        return [...acc, { id: roomId, room: { ...room, messages: [] } }];
      },
      [] as { id: string; room: MatchRoom }[]
    );

    if (roomsToStore.length) {
      await db.insert(matchesTable).values(roomsToStore);
    }

    roomsToArchive.forEach((_room, roomId) => {
      matches.delete(roomId);
    });
  } catch (error) {
    console.error("Room archive error:", error);
  }
};

setInterval(() => {
  try {
    updateRooms();
    void saveScore();
    makeMatch();
  } catch (error) {
    console.error("Main loop error:", error);
  }
}, 10000);

// TODO: add anonymous user cleanup
