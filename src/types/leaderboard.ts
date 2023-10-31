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

export const leaderboardTypeSchema = z.enum(["today", "all-time"]);

export type LeaderboardType = z.infer<typeof leaderboardTypeSchema>;
