import { EventEmitter } from "events";
import { CronJob } from "cron";

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
import { expireRanks } from "../db/rank.js";

const MAX_BOTS_PER_MATCH = env.PLAYERS_PER_MATCH > 3 ? 3 : 2;
const MIN_HUMANS_PER_MATCH = env.PLAYERS_PER_MATCH - MAX_BOTS_PER_MATCH;

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
  while (lobbyQueue.queue.length >= MIN_HUMANS_PER_MATCH) {
    let botsInMatch = getRandomInt({ max: MAX_BOTS_PER_MATCH, min: 1 });
    const humansInMatch = env.PLAYERS_PER_MATCH - botsInMatch;

    const humans = lobbyQueue.pickPlayers(humansInMatch);

    if (humans.length < humansInMatch) {
      botsInMatch = env.PLAYERS_PER_MATCH - humans.length;
    }

    const totalPlayers = humans.length + botsInMatch;

    if (
      botsInMatch <= MAX_BOTS_PER_MATCH &&
      totalPlayers === env.PLAYERS_PER_MATCH
    ) {
      const match = new Match(humans, botsInMatch);

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
  } catch (error) {
    console.error("Matchmaking error:", error);
  }
}, 30000);

setInterval(() => {
  try {
    deleteStaleMatches();

    storeScoresAndMatches().catch((error) =>
      console.error("Error storing matches:", error),
    );
  } catch (error) {
    console.error("Clean up loop error:", error);
  }
}, 10000);

new CronJob(
  `0 0 ${env.RANKS_EXPIRATION_HOUR} * * *`,
  () => {
    console.log("Expiring ranks...");

    db.transaction((tx) => expireRanks(tx))
      .then(() => {
        console.log("Ranks expired successfully.");
      })
      .catch((err) => {
        console.error("Expire error:", err);
      });
  },
  null,
  true,
);
