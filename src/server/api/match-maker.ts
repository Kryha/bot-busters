import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

import {
  CHAT_TIME_MS,
  MATCH_TIME_MS,
  VOTING_TIME_MS,
} from "~/constants/main.js";
import { env } from "~/env.mjs";
import { db } from "~/server/db/index.js";
import { Match, leaderboard } from "~/server/service/index.js";
import type {
  MatchEventType,
  MatchRoom,
  ReadyToPlayPayload,
} from "~/types/index.js";
import { insertMatches } from "../db/match.js";

export const ee = new EventEmitter();

export const lobbyQueue: string[] = [];

export const matches = new Map<string, Match>();

export const matchEvent = (
  roomId: string,
  eventType: MatchEventType = "message",
) => `chat_${roomId}_${eventType}`;

const makeMatch = () => {
  const botsInMatch = 1; // TODO: use more options
  const humansInMatch = env.PLAYERS_PER_MATCH - botsInMatch;

  // TODO: Make the players per match random within the range 1-4
  if (lobbyQueue.length < humansInMatch) return;

  const playerIds = lobbyQueue.splice(0, humansInMatch);
  const roomId = uuid();

  const match = new Match(roomId, playerIds, botsInMatch);

  matches.set(roomId, match);

  ee.emit("readyToPlay", {
    roomId,
    players: playerIds,
  } satisfies ReadyToPlayPayload);
  ee.emit("queueUpdate");
};

const matchLoop = () => {
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

    if (
      room.stage === "voting" &&
      (room.allPlayersVoted || roomAge >= CHAT_TIME_MS + VOTING_TIME_MS)
    ) {
      room.stage = "results";
      room.calculatePoints();
      ee.emit(matchEvent(roomId, "stageChange"));
    }
  });
};

const getPlayerData = async () => {
  const promises = Array.from(matches.values()).map(async (room) => {
    if (room.playerHistoryLoaded) return;

    await room.getPlayerPreviousMatches();
  });

  await Promise.all(promises);
};

const storeScoresAndMatches = async () => {
  const roomsToArchive = new Map<string, MatchRoom>();

  await db.transaction(async (tx) => {
    //TODO: Store stats of the match
    const promises = Array.from(matches.values()).map(async (room) => {
      if (room.stage !== "results" || !room.arePointsCalculated) return;

      const allScoresStored = await room.storeScore(tx);

      if (allScoresStored) {
        room.cleanup();
        roomsToArchive.set(room.id, room.toSerializable());
      }
    });

    await Promise.all(promises);

    const roomsToInsert = Array.from(roomsToArchive.values()).map((room) => ({
      id: room.id,
      room,
    }));

    if (roomsToInsert.length) {
      await insertMatches(roomsToInsert, tx);
      await leaderboard.calculate(tx);
    }

    roomsToArchive.forEach((_room, roomId) => matches.delete(roomId));
  });
};

setInterval(() => {
  try {
    matchLoop();
    storeScoresAndMatches().catch((error) =>
      console.error("Error storing matches:", error),
    );

    // TODO: remove `getPlayerData` from here
    getPlayerData().catch((error) =>
      console.error("Error getting player stats:", error),
    );

    makeMatch();
  } catch (error) {
    console.error("Main loop error:", error);
  }
}, 10000);
