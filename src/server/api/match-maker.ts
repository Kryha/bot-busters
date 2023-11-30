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
import { generateAgent } from "../service/agent.js";

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

    const players = playerIds.map((id) => generatePlayer(id));

    // TODO: add correct amount of agents based on amount of human players
    // Add agents to list of players
    // TODO: Bootstrap Agent & Connect to room WS
    const { agent } = generateAgent(uuid(), roomId);
    players.push(agent);

    chatRooms.set(roomId, {
      players,
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
      // TODO: calculate score based on votes & Filter out Agents
      const players = room.players.map((player) => ({
        ...player,
        score: getRandomInt(25),
      }));

      ee.emit(chatEvent(roomId, "timeout"));
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
