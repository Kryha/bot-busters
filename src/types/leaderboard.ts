import { z } from "zod";

// These are for the data rendered on the page
export const leaderboardDataSchema = z.object({
  rank: z.number(),
  avatar: z.string(),
  username: z.string(),
  score: z.number(),
  address: z.string(),
});

export type LeaderboardData = z.infer<typeof leaderboardDataSchema>;
