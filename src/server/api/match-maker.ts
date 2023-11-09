import { CHAT_TIME_MS, MATCH_TIME_MS } from "@/constants/main";
import { env } from "@/env.cjs";
import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";
import type {
  ChatEventType,
  ChatRoom,
  Player,
  ReadyToPlayPayload,
} from "@/server/api/match-types";
import { getRandomInt } from "@/utils/math";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { sql } from "drizzle-orm";

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
    });

    // TODO: update event
    ee.emit("readyToPlay", {
      roomId,
      players: playerIds,
      createdAt: Date.now(),
    } satisfies ReadyToPlayPayload);
    ee.emit("queueUpdate");
  } catch (error) {
    console.error("Match making error:", error);
  }
};

const updateRooms = () => {
  chatRooms.forEach((room, roomId) => {
    const roomAge = Date.now() - room.createdAt;
    const chatEnded = Date.now() > room.createdAt + CHAT_TIME_MS;

    if (roomAge >= MATCH_TIME_MS) {
      chatRooms.delete(roomId);
      return;
    }

    if (chatEnded) {
      room.stage = "voting";
      ee.emit(chatEvent(roomId, "stageChange"));

      // TODO: calculate score based on votes
      const players = room.players.map((player) => ({
        ...player,
        score: getRandomInt(25),
      }));

      ee.emit(chatEvent(roomId, "timeout"));
      // TODO: set stage to `voting`, set it to `results` after voting is complete and delete after score has been calculated
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
