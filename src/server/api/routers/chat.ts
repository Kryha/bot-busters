import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { chatRooms, ee } from "@/server/api/match-maker";
import { observable } from "@trpc/server/observable";

export interface ChatMessagePayload {
  sender: string;
  message: string;
  sentAt: number; // unix time
}

export const chatRouter = createTRPCRouter({
  onMessage: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      const room = chatRooms[input.roomId];
      if (!room) throw new Error("Room not found");

      const isUserInRoom = room.players.includes(ctx.session.address);
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

  sendMessage: protectedProcedure
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

      const isUserInRoom = room.players.includes(sender);
      if (!isUserInRoom) throw new Error("User is not part of this room");

      const payload: ChatMessagePayload = { sender, message, sentAt };
      ee.emit(roomId, payload);
      return payload;
    }),
});
