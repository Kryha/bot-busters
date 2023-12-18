import { z } from "zod";

export interface ReadyToPlayPayload {
  players: string[];
  roomId: string;
}

export interface QueueUpdatePayload {
  playerQueuePosition: number;
  queueLength: number;
}

export const chatMessagePayloadSchema = z.object({
  sender: z.string().uuid(),
  message: z.string(),
  sentAt: z.number(), // unix time
});
export type ChatMessagePayload = z.infer<typeof chatMessagePayloadSchema>;

export const characterIdSchema = z.enum(["1", "2", "3", "4", "5"]);
export type CharacterId = z.infer<typeof characterIdSchema>;

export const playerAchievementResultSchema = z.object({
  id: z.string(),
  points: z.number(),
});
export type PlayerAchievementResult = z.infer<
  typeof playerAchievementResultSchema
>;

export const playerStatsSchema = z.object({
  matchesPlayed: z.number(),
  AllBotsBustedInARow: z.number(),
  wordIsOutAchievement: z.boolean(),
});
export type PlayerStats = z.infer<typeof playerStatsSchema>;

export const playerSchema = z.object({
  userId: z.string().uuid(),
  characterId: characterIdSchema,
  score: z.number(),
  isBot: z.boolean().optional(), // `optional` makes sure we can hide this value when not in `results` stage
  isScoreSaved: z.boolean(),
  botsBusted: z.number(),
  correctGuesses: z.number(),
  votes: z.array(z.string().uuid()).optional(), // array of voted ids
  stats: playerStatsSchema.optional(),
  achievements: z.array(playerAchievementResultSchema), // array of achievement ids
});
export type PlayerType = z.infer<typeof playerSchema>;

export const matchStageSchema = z.enum(["chat", "voting", "results"]);
export type MatchStage = z.infer<typeof matchStageSchema>;

export const matchRoomSchema = z.object({
  id: z.string().uuid(),
  players: z.array(playerSchema),
  messages: z.array(chatMessagePayloadSchema),
  stage: matchStageSchema,
  arePointsCalculated: z.boolean(),
  createdAt: z.number(), // unix timestamp
  votingAt: z.number(), // unix timestamp
});
export type MatchRoom = z.infer<typeof matchRoomSchema>;

export type MatchEventType = "message" | "stageChange";
