import { z } from "zod";

export interface ReadyToPlayPayload {
  players: string[];
  roomId: string;
}

export interface QueueUpdatePayload {
  playerQueuePosition: number;
  queueLength: number;
}

export const characterIdSchema = z.enum(["1", "2", "3", "4", "5"]);
export type CharacterId = z.infer<typeof characterIdSchema>;

export const chatMessagePayloadSchema = z.object({
  sender: z.string().uuid().or(z.literal("0")),
  message: z.string(),
  sentAt: z.number(), // unix time
});
export type ChatMessagePayload = z.infer<typeof chatMessagePayloadSchema>;

export const typingPayload = z.object({
  sender: z.string().uuid(),
  isTyping: z.boolean(),
});
export type TypingPayload = z.infer<typeof typingPayload>;

export const storedChatMessageSchema = z.object({
  sender: characterIdSchema.or(z.literal("0")),
  message: z.string(),
  sentAt: z.number(), // unix time
  isBot: z.boolean(),
});
export type StoredChatMessage = z.infer<typeof storedChatMessageSchema>;

export const achievementIdSchema = z.enum([
  // Daily streak play
  "dailyStreakCounter",
  // Match achievement - perfect score (all votes correct)
  "goodBust",
  // Day achievement - successfully bust all bots 3 consecutive games
  "busterStreak",
  // One time achievement - player plays his first game
  "firstTimer",
  // Day achievement - play 5 days in a row
  "fiveDayStreak",
  // One time achievement - player Bust at least one bot in his first game
  "beginnersLuck",
  // One time achievement - player plays his first game as verified human
  "realHuman",
  // One time achievement - bust a total of 100 bots
  "masterBuster",
]);
export type AchievementId = z.infer<typeof achievementIdSchema>;

export const playerSchema = z.object({
  userId: z.string().uuid(),
  characterId: characterIdSchema,
  score: z.number(),
  isBot: z.boolean().optional(), // `optional` makes sure we can hide this value when not in `results` stage
  isScoreSaved: z.boolean(),
  botsBusted: z.number(),
  totalBotsBusted: z.number(),
  humansBusted: z.number(),
  humansFooled: z.number(),
  botsBustedScore: z.number(),
  humansBustedScore: z.number(),
  humansFooledScore: z.number(),
  correctGuesses: z.number(),
  votes: z.array(z.string().uuid()).optional(), // array of voted ids
  isVerified: z.boolean(),
  achievements: z.array(achievementIdSchema), // array of achievement ids
  isOnline: z.boolean(),
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

export type MatchEventType = "message" | "stageChange" | "typing";
