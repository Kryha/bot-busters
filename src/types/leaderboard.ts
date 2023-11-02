import { z } from "zod";

// These are for the data rendered on the page
export const leaderboardDataSchema = z.object({
  rank: z.number(),
  avatar: z.string(),
  username: z.string(),
  score: z.number(),
  address: z.string(),
  gamesPlayed: z.number(),
  payout: z.number(),
});

export type LeaderboardData = z.infer<typeof leaderboardDataSchema>;

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
