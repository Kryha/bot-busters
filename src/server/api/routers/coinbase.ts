import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import fetch from "node-fetch";

import { oldRanks, users } from "~/server/db/schema.js";
import { db } from "~/server/db/index.js";

import { createTRPCRouter, protectedProcedure } from "../trpc.js";
import { coinbase } from "~/server/service/coinbase.js";

const COINBASE_USER_ACTIVITIES_URL =
  "POST api.developer.coinbase.com/api/v3/coinbase.user_activity_report_service.UserActivitiesReportPublicService/ReportUserActivities" as const;

export const coinbaseRouter = createTRPCRouter({
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

      if (!user.coinbaseUuid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Coinbase account not linked",
        });
      }

      const [rank] = await db
        .select()
        .from(oldRanks)
        .where(and(eq(oldRanks.userId, user.id), eq(oldRanks.season, season)));

      if (!rank) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Rank not found" });
      }

      if (rank.prizeClaimed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Reward already claimed",
        });
      }

      // TODO: perform rank check with on-chain leaderboard
      // TODO: assign correct tier to activity, define final logic
      const activityName =
        rank.position <= 100 ? "aleo_botbusters_1" : "aleo_botbusters_play";

      const token = coinbase.signJwt(COINBASE_USER_ACTIVITIES_URL);

      const cbRes = await fetch(COINBASE_USER_ACTIVITIES_URL, {
        method: "POST",
        body: JSON.stringify({
          user_activities: [
            {
              // TODO: check if need to change id type based on tier
              user_identifier_type: 1,
              user_identifier: user.coinbaseUuid,
              activity_name: activityName,
            },
          ],
        }),
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!cbRes.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error from Coinbase API",
        });
      }

      await db
        .update(oldRanks)
        .set({ prizeClaimed: true })
        .where(and(eq(oldRanks.userId, user.id), eq(oldRanks.season, season)));
    }),
});
