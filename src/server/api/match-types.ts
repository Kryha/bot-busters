import { z } from "zod";

export interface ReadyToPlayPayload {
  players: string[];
  roomId: string;
}

export interface QueueUpdatePayload {
  playerQueuePosition: number;
  queueLength: number;
}

export interface ChatMessagePayload {
  sender: string;
  message: string;
  sentAt: number; // unix time
}

export const playerSchema = z.object({
  userId: z.string().uuid(),
  characterId: z.number(),
  score: z.number(),
  isBot: z.boolean().optional(), // `optional` makes sure we can hide this value when not in `results` stage
  isScoreSaved: z.boolean(),
  botsBusted: z.number(),
  correctGuesses: z.number(),
  votes: z.array(z.string().uuid()).optional(), // array of voted ids
});
export type PlayerType = z.infer<typeof playerSchema>;

export const matchStageSchema = z.enum(["chat", "voting", "results"]);
export type MatchStage = z.infer<typeof matchStageSchema>;

export const matchRoomSchema = z.object({
  players: z.array(playerSchema),
  stage: matchStageSchema,
  arePointsCalculated: z.boolean(),
  createdAt: z.number(), // unix timestamp
  votingAt: z.number(), // unix timestamp
});
export type MatchRoom = z.infer<typeof matchRoomSchema>;

export type MatchEventType = "message" | "stageChange";
