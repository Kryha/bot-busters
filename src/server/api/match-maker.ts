import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

import {
  CHAT_TIME_MS,
  MATCH_TIME_MS,
  VOTING_TIME_MS,
} from "~/constants/main.js";
import { env } from "~/env.mjs";
import { db } from "~/server/db/index.js";
import { matches as matchesTable } from "~/server/db/schema.js";
import { Match } from "~/server/service/index.js";
import type { MatchEventType, ReadyToPlayPayload } from "~/types/index.js";

export const ee = new EventEmitter();

export const lobbyQueue: string[] = [];

export const matches = new Map<string, Match>();

export const matchEvent = (
  roomId: string,
  eventType: MatchEventType = "message"
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

    if (room.stage === "voting" && roomAge >= CHAT_TIME_MS + VOTING_TIME_MS) {
      room.stage = "results";
      room.calculatePoints();
      ee.emit(matchEvent(roomId, "stageChange"));
    }
  });
};

const storeMatches = async () => {
  const roomsToArchive = new Map<string, Match>();

  //TODO: Store stats of the match
  const promises = Array.from(matches.values()).map(async (room) => {
    if (room.stage !== "results" || !room.arePointsCalculated) return;

    const allScoresStored = await room.storeScore();

    if (allScoresStored) {
      roomsToArchive.set(room.id, room);
    }
  });

  await Promise.all(promises);

  roomsToArchive.forEach((room) => room.cleanup());

  const roomsToStore = Array.from(roomsToArchive.values()).map((room) => ({
    id: room.id,
    room: room.toSerializable(),
  }));

  if (roomsToStore.length) {
    await db.insert(matchesTable).values(roomsToStore);
  }

  roomsToArchive.forEach((_room, roomId) => matches.delete(roomId));
};

setInterval(() => {
  try {
    matchLoop();
    storeMatches().catch((error) =>
      console.error("Error storing matches:", error)
    );
    makeMatch();
  } catch (error) {
    console.error("Main loop error:", error);
  }
}, 10000);

// TODO: add anonymous user cleanup
