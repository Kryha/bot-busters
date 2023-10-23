import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

export const ee = new EventEmitter();
export const lobbyQueue: string[] = [];

interface ChatRoom {
  players: [string, string];
  createdAt: number; // unix timestamp
}

type ChatRooms = Record<string, ChatRoom>;

export let chatRooms: ChatRooms = {};

export type ChatEventType = "message" | "timeout";

export const chatEvent = (
  roomId: string,
  eventType: ChatEventType = "message"
) => {
  return `chat_${roomId}_${eventType}`;
};

const TWO_MINUTES = 120000;

const makeMatch = () => {
  try {
    if (lobbyQueue.length < 2) return;
    const playerA = lobbyQueue.shift();
    const playerB = lobbyQueue.shift();

    if (!playerA || !playerB) throw new Error("Players not found in queue");

    const roomId = uuid();

    chatRooms[roomId] = {
      players: [playerA, playerB],
      createdAt: Date.now(),
    } satisfies ChatRoom;

    ee.emit("readyToPlay", { roomId, players: [playerA, playerB] });
    ee.emit("queueUpdate");
  } catch (error) {
    console.error("Match making error:", error);
  }
};

const deleteStaleMatches = () => {
  const preservedRooms: ChatRooms = Object.entries(chatRooms).reduce(
    (accRooms, [roomId, room]) => {
      // delete rooms that have been created more than 2 minutes ago
      if (Date.now() - room.createdAt >= TWO_MINUTES) {
        ee.emit(chatEvent(roomId, "timeout"));
        return accRooms;
      } else {
        return { ...accRooms, [roomId]: room };
      }
    },
    {} satisfies ChatRooms
  );
  chatRooms = preservedRooms;
};

setInterval(() => {
  deleteStaleMatches();
  makeMatch();
}, 10000);
