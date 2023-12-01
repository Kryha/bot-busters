import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { TRPCError } from "@trpc/server";
import lodash from "lodash";

import { db } from "~/server/db/index.js";
import { matches as matchesTable } from "~/server/db/schema.js";

import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { matchEvent, matches, ee } from "../match-maker.js";
import { matchRoomSchema, type ChatMessagePayload } from "../match-types.js";
import { eq } from "drizzle-orm";

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

  getRoom: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      let room = matches.get(input.roomId);

      if (!room) {
        const [dbRes] = await db
          .select()
          .from(matchesTable)
          .where(eq(matchesTable.id, input.roomId));

        const parsed = await matchRoomSchema.spa(dbRes?.room);

        if (!parsed.success)
          throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });

        room = parsed.data;
      }

      const player = room.players.find(
        (player) => player.userId === ctx.session.user.id
      );

      if (!player)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User is not part of this room",
        });

      if (room.stage !== "results") {
        const clonedRoom = lodash.cloneDeep(room);
        clonedRoom.players.forEach((player) => {
          player.isBot = undefined;
        });
        return clonedRoom;
      }

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
      // TODO: check if player sent at least one message

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
