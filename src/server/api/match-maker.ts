import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

export const ee = new EventEmitter();
export const lobbyQueue: string[] = [];
export const chatRooms: Record<
  string,
  { players: [string, string]; createdAt: number }
> = {};

const makeMatch = () => {
  try {
    if (lobbyQueue.length < 2) return;
    const playerA = lobbyQueue.shift();
    const playerB = lobbyQueue.shift();

    if (!playerA || !playerB) throw new Error("Players not found in queue");

    const roomId = uuid();

    chatRooms[roomId] = { players: [playerA, playerB], createdAt: Date.now() };

    ee.emit("readyToPlay", { roomId, players: [playerA, playerB] });
    ee.emit("queueUpdate");
  } catch (error) {
    console.error("Match making error:", error);
  }
};

const deleteStaleMatches = () => {
  // TODO: implement
};

setInterval(() => {
  // TODO: delete logs
  console.log("queue:", lobbyQueue);
  console.log("rooms:", chatRooms);
  deleteStaleMatches();
  makeMatch();
}, 10000);
