import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { chatEvent, chatRooms, ee } from "@/server/api/match-maker";
import { observable } from "@trpc/server/observable";

export interface ChatMessagePayload {
  sender: string;
  message: string;
  sentAt: number; // unix time
}

const verifyUser = (userAddress: string, roomId: string) => {
  const room = chatRooms[roomId];
  if (!room) throw new Error("Room not found");

  const isUserInRoom = room.players.includes(userAddress);
  if (!isUserInRoom) throw new Error("User is not part of this room");
};

export const chatRouter = createTRPCRouter({
  onMessage: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyUser(ctx.session.address, input.roomId);

      return observable<ChatMessagePayload>((emit) => {
        const handleEvent = (payload: ChatMessagePayload) => {
          emit.next(payload);
        };

        ee.on(chatEvent(input.roomId), handleEvent);
        return () => {
          ee.off(chatEvent(input.roomId), handleEvent);
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

      verifyUser(sender, input.roomId);

      const payload: ChatMessagePayload = { sender, message, sentAt };
      ee.emit(chatEvent(roomId), payload);
      return payload;
    }),

  onTimeout: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyUser(ctx.session.address, input.roomId);

      return observable<void>((emit) => {
        const handleEvent = () => {
          emit.next();
        };

        ee.on(chatEvent(input.roomId, "timeout"), handleEvent);
        return () => {
          ee.off(chatEvent(input.roomId, "timeout"), handleEvent);
        };
      });
    }),
});
