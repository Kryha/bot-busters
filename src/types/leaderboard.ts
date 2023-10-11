import { z } from "zod";

export const leaderboardSchema = z.object({
  rank: z.number(),
  avatar: z.string(),
  username: z.string(),
  score: z.number(),
  address: z.string(),
});

export type Leaderboard = z.infer<typeof leaderboardSchema>;
