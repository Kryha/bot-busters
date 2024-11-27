import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { and, eq, isNull, not } from "drizzle-orm";
import fetch from "node-fetch";

import { type BBPgTransaction } from "~/server/db/index.js";
import { getCurrentSeason } from "~/server/db/rank.js";
import { oldRanks, users } from "~/server/db/schema.js";
import { WINNING_RANK } from "~/constants/main.js";
import { env } from "~/env.mjs";

const COINBASE_USER_ACTIVITIES_URL =
  "POST api.developer.coinbase.com/api/v3/coinbase.user_activity_report_service.UserActivitiesReportPublicService/ReportUserActivities" as const;

const signJwt = (uri: string) => {
  const token = jwt.sign(
    {
      aud: ["user_activity_report_service"],
      iss: "coinbase-cloud",
      nbf: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10,
      sub: env.COINBASE_ORG,
      uri,
    },
    env.COINBASE_PRIVATE_KEY,
    {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: env.COINBASE_ORG,
      },
      // TODO: if nonce is needed check how to use it
      // header: {
      //   kid: env.COINBASE_ORG,
      //   nonce: Math.floor(Date.now() / 1000).toString(),
      // },
    },
  );
  return token;
};

const postClaimActivity = async (position: number, coinbaseUuid: string) => {
  // TODO: perform rank check with on-chain leaderboard
  // TODO: assign correct tier to activity, define final logic
  const activityName =
    position <= WINNING_RANK ? "aleo_botbusters_1" : "aleo_botbusters_play";

  const token = coinbase.signJwt(COINBASE_USER_ACTIVITIES_URL);

  const cbRes = await fetch(COINBASE_USER_ACTIVITIES_URL, {
    method: "POST",
    body: JSON.stringify({
      user_activities: [
        {
          // TODO: check if need to change id type based on tier
          user_identifier_type: 1,
          user_identifier: coinbaseUuid,
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
};

const autoClaimRewards = async (tx: BBPgTransaction) => {
  const latestSeason = await getCurrentSeason(tx);

  if (latestSeason <= 1) return;

  const seasonToClaim = latestSeason - 1;

  const rankedUsers = await tx
    .select({
      id: users.id,
      coinbaseUuid: users.coinbaseUuid,
      position: oldRanks.position,
    })
    .from(oldRanks)
    .where(
      and(eq(oldRanks.season, seasonToClaim), eq(oldRanks.prizeClaimed, false)),
    )
    .innerJoin(users, eq(oldRanks.userId, users.id))
    .having(not(isNull(users.coinbaseUuid)))
    .groupBy(users.id, oldRanks.position);

  const promiseAutoClaim = rankedUsers.map(async (user) => {
    try {
      if (!user.coinbaseUuid) {
        throw new Error(`Coinbase UUID not found for user id: ${user.id}`);
      }

      await postClaimActivity(user.position, user.coinbaseUuid);
      await tx
        .update(oldRanks)
        .set({ prizeClaimed: true })
        .where(
          and(eq(oldRanks.userId, user.id), eq(oldRanks.season, seasonToClaim)),
        );
    } catch (error) {
      console.error("Auto claim failed for one user:", error);
    }
  });

  await Promise.all(promiseAutoClaim);
};

export const coinbase = {
  signJwt,
  autoClaimRewards,
  postClaimActivity,
};
