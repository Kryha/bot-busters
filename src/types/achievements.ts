import { z } from "zod";
import { userAchievementsSchema } from "~/server/db/schema.js";
import {
  chatMessagePayloadSchema,
  matchRoomSchema,
  playerSchema,
} from "./match.js";

export const achievementDataSchema = z.object({
  player: playerSchema,
  messages: z.array(chatMessagePayloadSchema),
  botsBusted: z.number(),
  otherPlayers: z.array(playerSchema),
  playerHistory: z.array(matchRoomSchema),
  playerAchievements: z.array(userAchievementsSchema),
});
export type AchievementDataType = z.infer<typeof achievementDataSchema>;

export const achievementSchema = z.object({
  name: z.string(),
  description: z.string(),
  calculate: z.function().args(achievementDataSchema).returns(z.boolean()),
});

export type Achievement = z.infer<typeof achievementSchema>;
