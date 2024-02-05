import { EventEmitter } from "events";

import { MATCH_TIME_MS } from "~/constants/main.js";
import { env } from "~/env.mjs";
import { db } from "~/server/db/index.js";
import { insertMatches } from "~/server/db/match.js";
import { Match, leaderboard, lobbyQueue } from "~/server/service/index.js";
import type {
  MatchEventType,
  MatchRoom,
  StoredChatMessage,
} from "~/types/index.js";

export const ee = new EventEmitter();

export const matches = new Map<string, Match>();

export const matchEvent = (
  roomId: string,
  eventType: MatchEventType = "message",
) => `chat_${roomId}_${eventType}`;

export const isUserPlaying = (userId: string) => {
  for (const match of matches.values()) {
    const isInMatch = !!match.players.find((p) => p.userId === userId);
    if (isInMatch) return true;
  }
  return false;
};

const makeMatch = () => {
  const botsInMatch = 1; // TODO: use more options
  const humansInMatch = env.PLAYERS_PER_MATCH - botsInMatch;

  // TODO: Make the players per match random within the range 1-4
  // TODO: Benchmark and check what's the maximum amount of matches we can handle at a time
  while (lobbyQueue.queue.length >= humansInMatch) {
    const playerIds = lobbyQueue.pickPlayers(humansInMatch);
    const match = new Match(playerIds, botsInMatch);

    matches.set(match.id, match);
  }
};

const deleteStaleMatches = () => {
  matches.forEach((room, roomId) => {
    const roomAge = Date.now() - room.createdAt;

    if (roomAge >= MATCH_TIME_MS) {
      matches.delete(roomId);
    }
  });
};

const storeScoresAndMatches = async () => {
  const roomsToArchive = new Map<
    string,
    { room: MatchRoom; messages: StoredChatMessage[] }
  >();

  await db.transaction(async (tx) => {
    //TODO: Store stats of the match
    const promises = Array.from(matches.values()).map(async (room) => {
      if (room.stage !== "results" || !room.arePointsCalculated) return;

      const allScoresStored = await room.storeMatchStats(tx);

      if (allScoresStored) {
        const messages = room.convertMessages();
        room.cleanup();
        roomsToArchive.set(room.id, { room: room.toSerializable(), messages });
      }
    });

    await Promise.all(promises);

    const roomsToInsert = Array.from(roomsToArchive.values()).map(
      ({ room, messages }) => ({
        id: room.id,
        room: room,
        messages,
      }),
    );

    if (roomsToInsert.length) {
      await insertMatches(roomsToInsert, tx);
      await leaderboard.calculate(tx);
    }

    roomsToArchive.forEach((_room, roomId) => matches.delete(roomId));
  });
};

setInterval(() => {
  try {
    makeMatch();
    deleteStaleMatches();

    storeScoresAndMatches().catch((error) =>
      console.error("Error storing matches:", error),
    );
  } catch (error) {
    console.error("Main loop error:", error);
  }
}, 10000);
