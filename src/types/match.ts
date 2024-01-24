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

export const achievementIdSchema = z.enum([
  // Daily streak play
  "1",
  // Match achievement - written last message
  "11",
  // Match achievement - perfect score (all votes correct)
  "12",
  // Match achievement - two people selected you as a bot
  "13",
  // Day achievement - successfully bust all bots 3 consecutive games
  "101",
  // Day achievement - play 5 days in a row
  "102",
  // One time achievement - player plays his first game
  "201",
  // One time achievement - player Bust at least one bot in his first game
  "202",
  // One time achievement - player plays his first game as verified human
  "203",
]);
export type AchievementId = z.infer<typeof achievementIdSchema>;

export const characterIdSchema = z.enum(["1", "2", "3", "4", "5"]);
export type CharacterId = z.infer<typeof characterIdSchema>;

export const playerSchema = z.object({
  userId: z.string().uuid(),
  characterId: characterIdSchema,
  score: z.number(),
  isBot: z.boolean().optional(), // `optional` makes sure we can hide this value when not in `results` stage
  isScoreSaved: z.boolean(),
  botsBusted: z.number(),
  correctGuesses: z.number(),
  votes: z.array(z.string().uuid()).optional(), // array of voted ids
  isVerified: z.boolean().optional(),
  achievements: z.array(achievementIdSchema), // array of achievement ids
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
