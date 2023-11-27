import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";
import { sql } from "drizzle-orm";

import {
  CHAT_TIME_MS,
  MATCH_TIME_MS,
  VOTING_TIME_MS,
} from "~/constants/main.js";
import { env } from "~/env.mjs";
import { getRandomInt } from "~/utils/math.js";
import { db } from "~/server/db/index.js";
import { users } from "~/server/db/schema.js";

import type {
  ChatEventType,
  ChatRoom,
  Player,
  ReadyToPlayPayload,
} from "./match-types.js";

export const ee = new EventEmitter();
export const lobbyQueue: string[] = [];

export const chatEvent = (
  roomId: string,
  eventType: ChatEventType = "message"
) => {
  return `chat_${roomId}_${eventType}`;
};

export const chatRooms = new Map<string, ChatRoom>();

const generatePlayer = (userId: string): Player => ({
  userId,
  score: 0,
  isBot: false, // TODO: set to correct value
  isScoreSaved: false,
});

const makeMatch = () => {
  try {
    if (lobbyQueue.length < env.PLAYERS_PER_MATCH) return;

    const playerIds = lobbyQueue.splice(0, env.PLAYERS_PER_MATCH);

    const roomId = uuid();

    chatRooms.set(roomId, {
      players: playerIds.map((id) => generatePlayer(id)),
      stage: "chat",
      createdAt: Date.now(),
      votingAt: Date.now() + CHAT_TIME_MS,
    });

    // TODO: update event
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
  chatRooms.forEach((room, roomId) => {
    const roomAge = Date.now() - room.createdAt;

    if (roomAge >= MATCH_TIME_MS) {
      chatRooms.delete(roomId);
      return;
    }

    if (room.stage === "chat" && roomAge >= CHAT_TIME_MS) {
      room.stage = "voting";
      ee.emit(chatEvent(roomId, "stageChange"));
      // TODO: get scores
    }
    if (room.stage === "voting" && roomAge >= CHAT_TIME_MS + VOTING_TIME_MS) {
      room.stage = "results";
      ee.emit(chatEvent(roomId, "stageChange"));
      // TODO: calculate score based on votes
      const players = room.players.map((player) => ({
        ...player,
        score: getRandomInt(25),
      }));

      chatRooms.set(roomId, { ...room, players, stage: "results" });
    }
  });
};

// TODO: also store match details in the db
const saveScore = async () => {
  const roomsToDelete = new Set<string>();

  const promises = Array.from(chatRooms.entries()).flatMap(([roomId, room]) => {
    if (room.stage !== "results") return;
    roomsToDelete.add(roomId);

    return room.players.map(async (player) => {
      try {
        if (player.isScoreSaved) return;
        player.isScoreSaved = true;
        await db.execute(
          sql`UPDATE ${users} SET score = score + ${player.score} WHERE ${users.id} = ${player.userId}`
        );
      } catch (error) {
        player.isScoreSaved = false;
        console.error("Score update error:", error);
        roomsToDelete.delete(roomId);
      }
    });
  });

  await Promise.all(promises);

  roomsToDelete.forEach((roomId) => {
    chatRooms.delete(roomId);
  });
};

setInterval(() => {
  updateRooms();
  void saveScore();
  makeMatch();
}, 10000);
