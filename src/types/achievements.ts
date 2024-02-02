import { z } from "zod";
import { userAchievementsSchema } from "~/server/db/schema.js";
import { matchRoomSchema, playerSchema } from "./match.js";
export const achievementDataSchema = z.object({
  player: playerSchema,
  botsBusted: z.number(),
  otherPlayers: z.array(playerSchema),
  playerHistory: z.array(matchRoomSchema).optional(),
  playerAchievements: z.array(userAchievementsSchema).optional(),
});
export type AchievementDataType = z.infer<typeof achievementDataSchema>;

export const achievementSchema = z.object({
  name: z.string(),
  description: z.string(),
  calculate: z.function().args(achievementDataSchema).returns(z.boolean()),
});

export type Achievement = z.infer<typeof achievementSchema>;
