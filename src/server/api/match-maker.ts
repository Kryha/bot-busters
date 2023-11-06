import { CHAT_TIME_MS, MATCH_TIME_MS } from "@/constants";
import { env } from "@/env.cjs";
import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";
import type {
  ChatEventType,
  ChatRooms,
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

export let chatRooms: ChatRooms = {};

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

    chatRooms[roomId] = {
      players: playerIds.map((id) => generatePlayer(id)),
      stage: "chat",
      createdAt: Date.now(),
    };

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
  const preservedRooms: ChatRooms = Object.entries(chatRooms).reduce(
    (accRooms: ChatRooms, [roomId, room]) => {
      const roomAge = Date.now() - room.createdAt;

      switch (true) {
        case roomAge >= MATCH_TIME_MS:
          // delete stale chat room
          return accRooms;

        case room.stage === "chat": {
          if (roomAge >= CHAT_TIME_MS) {
            // TODO: calculate score based on votes
            const players = room.players.map((player) => ({
              ...player,
              score: getRandomInt(25),
            }));

            ee.emit(chatEvent(roomId, "timeout"));
            return {
              ...accRooms,
              // TODO: set stage to `voting`, set it to `results` after voting is complete and delete after score has been calculated
              [roomId]: { ...room, stage: "results", players },
            } satisfies ChatRooms;
          }
        }

        default:
          return { ...accRooms, [roomId]: room };
      }
    },
    {} satisfies ChatRooms
  );
  chatRooms = preservedRooms;
};

// TODO: also store match details in the db and delete record entry
const saveScore = async () => {
  const promises = Object.entries(chatRooms).flatMap(([roomId, room]) => {
    if (room.stage !== "results") return;
    return room.players.map(async (player, playerIndex) => {
      try {
        if (player.isScoreSaved) return;
        chatRooms[roomId]!.players[playerIndex]!.isScoreSaved = true;
        console.log("Updating user score", player.score);
        await db.execute(
          sql`UPDATE ${users} SET score = score + ${player.score} WHERE ${users.id} = ${player.userId}`
        );
      } catch (error) {
        chatRooms[roomId]!.players[playerIndex]!.isScoreSaved = false;
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
