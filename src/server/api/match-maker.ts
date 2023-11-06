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

export const ee = new EventEmitter();
export const lobbyQueue: string[] = [];

export const chatEvent = (
  roomId: string,
  eventType: ChatEventType = "message"
) => {
  return `chat_${roomId}_${eventType}`;
};

export let chatRooms: ChatRooms = {};

const TWO_MINUTES = 120000;
const TEN_MINUTES = 600000;

const generatePlayer = (userId: string): Player => ({
  userId,
  score: 0,
  isBot: false, // TODO: set to correct value
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
    (accRooms, [roomId, room]) => {
      const roomAge = Date.now() - room.createdAt;

      switch (true) {
        case roomAge >= TEN_MINUTES:
          // delete stale chat room
          return accRooms;

        case room.stage === "chat": {
          if (roomAge >= TWO_MINUTES) {
            // TODO: calculate score based on votes
            // TODO: increment score on db
            // TODO: delete from record of matches after a bit of time (how much time? maybe the cleanup function is enough?)
            const players = room.players.map((player) => ({
              ...player,
              score: getRandomInt(25),
            }));

            ee.emit(chatEvent(roomId, "timeout"));
            return {
              ...accRooms,
              // TODO: set stage to `voting`, set it to `finished` after voting is complete and delete after score has been calculated
              [roomId]: { ...room, stage: "finished", players },
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

// const calculateScores = () => {
//   for (const roomId in chatRooms) {
//     const room = chatRooms[roomId];
//     if (room?.stage === "finished") {
//       room.players.forEach((player) => {
//         if (player.isBot) return;
//         // TODO: calculate score based on votes
//         // TODO: increment score on db
//         // TODO: delete from record of matches after a bit of time (how much time? maybe the cleanup function is enough?)
//         player.score = getRandomInt(25);
//       });
//     }
//   }
// };

setInterval(() => {
  updateRooms();
  makeMatch();
}, 10000);
