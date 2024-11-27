import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { oldRanks, users } from "~/server/db/schema.js";
import { db } from "~/server/db/index.js";
import { coinbase } from "~/server/service/coinbase.js";
import { selectUserById } from "~/server/db/user.js";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc.js";

export const coinbaseRouter = createTRPCRouter({
  checkUuid: publicProcedure
    .input(z.object({ coinbaseUuid: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const usersWithUuid = await db
        .select()
        .from(users)
        .where(eq(users.coinbaseUuid, input.coinbaseUuid));
      return !!usersWithUuid.length;
    }),

  storeUuid: protectedProcedure
    .input(z.object({ coinbaseUuid: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { coinbaseUuid } = input;

      if (user.coinbaseUuid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Coinbase UUID already present",
        });
      }

      await db.update(users).set({ coinbaseUuid }).where(eq(users.id, user.id));
    }),

  claimReward: protectedProcedure
    .input(z.object({ season: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { season } = input;

      const loggedUser = await selectUserById(user.id);

      if (!loggedUser?.coinbaseUuid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Coinbase account not linked",
        });
      }

      const [rank] = await db
        .select()
        .from(oldRanks)
        .where(
          and(eq(oldRanks.userId, loggedUser.id), eq(oldRanks.season, season)),
        );

      if (!rank) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Rank not found" });
      }

      if (rank.prizeClaimed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Reward already claimed",
        });
      }

      await coinbase.postClaimActivity(rank.position, loggedUser.coinbaseUuid);

      await db
        .update(oldRanks)
        .set({ prizeClaimed: true })
        .where(
          and(eq(oldRanks.userId, loggedUser.id), eq(oldRanks.season, season)),
        );
    }),
});
