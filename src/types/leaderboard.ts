import { z } from "zod";

import { type RouterOutput } from "~/server/api/root.js";

export type LeaderboardData =
  RouterOutput["user"]["getRankedUsers"]["players"][number];

export const userStatsDataSchema = z.object({
  todaysPoints: z.number(),
  todaysPosition: z.number(),
  allTimePoints: z.number(),
  allTimePosition: z.number(),
});

export type UserStatsData = z.infer<typeof userStatsDataSchema>;

export const leaderboardTypeSchema = z.enum([
  "all-time",
  "today",
  "yesterday",
  "two-days-ago",
  "three-days-ago",
  "four-days-ago",
]);

export type LeaderboardType = z.infer<typeof leaderboardTypeSchema>;
