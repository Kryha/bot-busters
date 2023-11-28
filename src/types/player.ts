import { z } from "zod";

export type TopRankedPlayer = {
  username: string;
  score: number;
};

// These are for the data rendered on the page

export const payoutStateSchema = z.enum(["new", "potential", "noPayout"]);
export type PayoutState = z.infer<typeof payoutStateSchema>;

export const payoutDataSchema = z.object({
  credits: z.number().optional(),
  state: payoutStateSchema,
});

export type PayoutData = z.infer<typeof payoutDataSchema>;

export const playerProfileDataSchema = z.object({
  date: z.number(),
  ranking: z.number(),
  score: z.number(),
  gamesPlayed: z.number(),
  payout: payoutDataSchema,
});

export type PlayerProfileData = z.infer<typeof playerProfileDataSchema>;
