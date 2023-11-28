import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";
import { sql } from "drizzle-orm";

import {
  CHAT_TIME_MS,
  MATCH_TIME_MS,
  VOTING_TIME_MS,
} from "~/constants/main.js";
import { env } from "~/env.mjs";
import { db } from "~/server/db/index.js";
import { users } from "~/server/db/schema.js";
import { getRandomUsername } from "~/utils/username.js";

import type {
  MatchEventType,
  MatchRoom,
  Player,
  ReadyToPlayPayload,
} from "./match-types.js";

export const ee = new EventEmitter();
export const lobbyQueue: string[] = [];

export const matchEvent = (
  roomId: string,
  eventType: MatchEventType = "message"
) => {
  return `chat_${roomId}_${eventType}`;
};

export const matches = new Map<string, MatchRoom>();

const generatePlayer = (userId: string): Player => ({
  userId,
  score: 0,
  isBot: false, // TODO: set to correct value
  isScoreSaved: false,
  botsBusted: 0,
  correctGuesses: 0,
  votes: [],
  // TODO: use `getRandomChatUsername` after colour assign logic is in
  chatNickname: getRandomUsername(),
});

const makeMatch = () => {
  try {
    if (lobbyQueue.length < env.PLAYERS_PER_MATCH) return;

    const playerIds = lobbyQueue.splice(0, env.PLAYERS_PER_MATCH);

    const roomId = uuid();

    matches.set(roomId, {
      players: playerIds.map((id) => generatePlayer(id)),
      stage: "chat",
      arePointsCalculated: false,
      arePointsSaved: false,
      createdAt: Date.now(),
      votingAt: Date.now() + CHAT_TIME_MS,
    });

    ee.emit("readyToPlay", {
      roomId,
      players: playerIds,
    } satisfies ReadyToPlayPayload);
    ee.emit("queueUpdate");
  } catch (error) {
    console.error("Match making error:", error);
  }
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
      // TODO: get scores
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

        otherPlayers.forEach((p) => {
          const isVoted = player.votes.includes(p.userId);
          const hasGuessed = p.isBot ? isVoted : !isVoted;

          if (hasGuessed) {
            if (p.isBot) {
              botsBusted += 1;
            }

            correctGuesses += 1;
            // TODO: update score calculation based on final ruleset
            score += 5;
          }
        });

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

// TODO: also store match details in the db
const saveScore = async () => {
  const promises = Array.from(matches.entries()).flatMap(([_roomId, room]) => {
    if (
      room.stage !== "results" ||
      !room.arePointsCalculated ||
      room.arePointsSaved
    )
      return;

    room.arePointsSaved = true;

    return room.players.map(async (player) => {
      try {
        if (player.isScoreSaved) return;
        player.isScoreSaved = true;
        await db.execute(
          sql`UPDATE ${users} SET score = score + ${player.score} WHERE ${users.id} = ${player.userId}`
        );
      } catch (error) {
        player.isScoreSaved = false;
        room.arePointsSaved = false;
        console.error("Score update error:", error);
      }
    });
  });

  await Promise.all(promises);
};

setInterval(() => {
  updateRooms();
  void saveScore();
  makeMatch();
}, 10000);
