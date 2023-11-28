import { z } from "zod";
import { observable } from "@trpc/server/observable";

import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { matchEvent, matches, ee } from "../match-maker.js";
import type { ChatMessagePayload } from "../match-types.js";
import { TRPCError } from "@trpc/server";

const verifyPlayer = (userId: string, roomId: string) => {
  const room = matches.get(roomId);
  if (!room)
    throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });

  const player = room.players.find((player) => player.userId === userId);
  if (!player)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User is not part of this room",
    });

  return { room, player };
};

export const matchRouter = createTRPCRouter({
  onMessage: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyPlayer(ctx.session.user.id, input.roomId);

      return observable<ChatMessagePayload>((emit) => {
        const handleEvent = (payload: ChatMessagePayload) => {
          emit.next(payload);
        };

        ee.on(matchEvent(input.roomId), handleEvent);
        return () => {
          ee.off(matchEvent(input.roomId), handleEvent);
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
      const sender = ctx.session.user.id;

      verifyPlayer(sender, input.roomId);

      const payload: ChatMessagePayload = { sender, message, sentAt };
      ee.emit(matchEvent(roomId), payload);
      return payload;
    }),

  onStageChange: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .subscription(({ ctx, input }) => {
      verifyPlayer(ctx.session.user.id, input.roomId);
      const room = matches.get(input.roomId);
      if (!room) throw new Error("Room not found");

      return observable((emit) => {
        const handleEvent = () => {
          emit.next({});
        };

        ee.on(matchEvent(input.roomId, "stageChange"), handleEvent);
        return () => {
          ee.off(matchEvent(input.roomId, "stageChange"), handleEvent);
        };
      });
    }),

  // TODO: don't send private data to client
  getRoom: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      verifyPlayer(ctx.session.user.id, input.roomId);
      const room = matches.get(input.roomId);
      if (!room) throw new Error("Room not found");

      return room;
    }),

  vote: protectedProcedure
    .input(
      z.object({
        selectedUserIds: z.array(z.string().uuid()),
        roomId: z.string().uuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { selectedUserIds, roomId } = input;

      const { room, player } = verifyPlayer(ctx.session.user.id, roomId);

      if (room.stage !== "voting") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not in the voting stage",
        });
      }

      if (selectedUserIds.includes(player.userId)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot pick yourself as a bot",
        });
      }

      player.votes = selectedUserIds;
    }),
});
