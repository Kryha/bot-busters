import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { chatEvent, chatRooms, ee } from "@/server/api/match-maker";
import { observable } from "@trpc/server/observable";
import type {
  ChatMessagePayload,
  StagePayload,
} from "@/server/api/match-types";

const verifyUser = (userId: string, roomId: string) => {
  const room = chatRooms.get(roomId);
  if (!room) throw new Error("Room not found");

  const isUserInRoom = room.players.find((player) => player.userId === userId);
  if (!isUserInRoom) throw new Error("User is not part of this room");
};

export const chatRouter = createTRPCRouter({
  onMessage: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyUser(ctx.session.id, input.roomId);

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
      const sender = ctx.session.id;

      verifyUser(sender, input.roomId);

      const payload: ChatMessagePayload = { sender, message, sentAt };
      ee.emit(chatEvent(roomId), payload);
      return payload;
    }),

  onStageChange: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyUser(ctx.session.id, input.roomId);
      const room = chatRooms.get(input.roomId);
      if (!room) throw new Error("Room not found");

      return observable<StagePayload>((emit) => {
        const handleEvent = () => {
          emit.next({ countdown: room.countdown });
        };

        ee.on(chatEvent(input.roomId, "stageChange"), handleEvent);
        return () => {
          ee.off(chatEvent(input.roomId, "stageChange"), handleEvent);
        };
      });
    }),

  onTimeout: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyUser(ctx.session.id, input.roomId);

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
