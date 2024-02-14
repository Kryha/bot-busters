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
import { getRandomInt } from "~/utils/math.js";

const MAX_BOTS_PER_MATCH = env.PLAYERS_PER_MATCH > 3 ? 3 : 2;

export const ee = new EventEmitter();

export const matches = new Map<string, Match>();

export const matchEvent = (
  roomId: string,
  eventType: MatchEventType = "message",
) => `chat_${roomId}_${eventType}`;

// TODO: use a set to store players for faster check, make this service a class
export const getOngoingMatchByUserId = (userId: string) => {
  for (const match of matches.values()) {
    const isInMatch = !!match.players.find((p) => p.userId === userId);
    if (isInMatch) return match;
  }
};

const makeMatch = () => {
  const minHumansInMatch = env.PLAYERS_PER_MATCH - MAX_BOTS_PER_MATCH;

  // TODO: Benchmark and check what's the maximum amount of matches we can handle at a time
  while (lobbyQueue.queue.length >= minHumansInMatch) {
    let botsInMatch = getRandomInt({ max: MAX_BOTS_PER_MATCH, min: 1 });
    const humansInMatch = env.PLAYERS_PER_MATCH - botsInMatch;

    const playerIds = lobbyQueue.pickPlayers(humansInMatch);

    if (playerIds.length < humansInMatch) {
      botsInMatch = env.PLAYERS_PER_MATCH - playerIds.length;
    }

    const totalPlayers = playerIds.length + botsInMatch;

    if (
      botsInMatch <= MAX_BOTS_PER_MATCH &&
      totalPlayers === env.PLAYERS_PER_MATCH
    ) {
      const match = new Match(playerIds, botsInMatch);

      matches.set(match.id, match);
    }
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
        createdAt: new Date(room.createdAt).toISOString(),
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
