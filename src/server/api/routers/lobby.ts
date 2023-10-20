import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { randomUUID } from "crypto";
import { z } from "zod";

// TODO: move chat behaviour in another route
// TODO: handle deleting chat rooms

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

// TODO: improve or remove
const lobbyQueue: string[] = [];

const chatRooms: Record<string, [string, string]> = {};

interface ReadyToPlayPayload {
  players: [string, string];
  roomId: string;
}

interface QueueUpdatePayload {
  myPlaceInQueue: number;
  queueLength: number;
}

export interface ChatMessagePayload {
  sender: string;
  message: string;
  sentAt: number; // unix time
}

const makeMatch = () => {
  try {
    if (lobbyQueue.length < 2) return;
    const playerA = lobbyQueue.shift();
    const playerB = lobbyQueue.shift();

    if (!playerA || !playerB) throw new Error("Players not found in queue");

    const roomId = randomUUID();

    chatRooms[roomId] = [playerA, playerB];

    ee.emit("readyToPlay", { roomId, players: [playerA, playerB] });
    ee.emit("queueUpdate");
  } catch (error) {
    console.error("Match making error:", error);
  }
};

// TODO: delete
setInterval(() => {
  console.log("queue:", lobbyQueue);
  console.log("rooms:", chatRooms);
  makeMatch();
}, 10000);

export const lobbyRouter = createTRPCRouter({
  onQueueUpdate: protectedProcedure.subscription(({ ctx }) => {
    return observable<QueueUpdatePayload>((emit) => {
      const handleEvent = () => {
        const myPlaceInQueue = lobbyQueue.indexOf(ctx.session.address) + 1;
        // emit data to client
        emit.next({
          myPlaceInQueue,
          queueLength: lobbyQueue.length,
        });
      };

      ee.on("queueUpdate", handleEvent);

      return () => {
        ee.off("queueUpdate", handleEvent);

        const { address } = ctx.session;

        const index = lobbyQueue.indexOf(address);
        if (index < 0) return;
        lobbyQueue.splice(index, 1);
      };
    });
  }),
  join: protectedProcedure.mutation(({ ctx }) => {
    const { address } = ctx.session;

    const hasJoined = lobbyQueue.includes(address);

    if (!hasJoined) {
      lobbyQueue.push(address);
    }

    const myPlaceInQueue = lobbyQueue.indexOf(ctx.session.address) + 1;

    ee.emit("queueUpdate");
    return { myPlaceInQueue, queueLength: lobbyQueue.length };
  }),

  onReadyToPlay: protectedProcedure.subscription(({ ctx }) => {
    return observable<ReadyToPlayPayload>((emit) => {
      const handleEvent = (payload: ReadyToPlayPayload) => {
        const isPlayer = payload.players.includes(ctx.session.address);

        if (isPlayer) {
          // This event will trigger a redirect to the chat page on the client
          emit.next(payload);
        }
      };

      ee.on("readyToPlay", handleEvent);
      return () => {
        ee.off("readyToPlay", handleEvent);
      };
    });
  }),

  onChatMessage: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      const room = chatRooms[input.roomId];
      if (!room) throw new Error("Room not found");

      const isUserInRoom = room.includes(ctx.session.address);
      if (!isUserInRoom) throw new Error("User is not part of this room");

      return observable<ChatMessagePayload>((emit) => {
        const handleEvent = (payload: ChatMessagePayload) => {
          emit.next(payload);
        };

        ee.on(input.roomId, handleEvent);
        return () => {
          ee.off(input.roomId, handleEvent);
        };
      });
    }),

  sendChatMessage: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        sentAt: z.number(),
        roomId: z.string().uuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { message, sentAt, roomId } = input;
      const sender = ctx.session.address;

      const room = chatRooms[input.roomId];
      if (!room) throw new Error("Room not found");

      const isUserInRoom = room.includes(sender);
      if (!isUserInRoom) throw new Error("User is not part of this room");

      const payload: ChatMessagePayload = { sender, message, sentAt };
      ee.emit(roomId, payload);
      return payload;
    }),
});
