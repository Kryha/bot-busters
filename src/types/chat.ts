import { type ChatMessagePayload } from "~/server/api/match-types";

export interface ChatMessage extends ChatMessagePayload {
  isLocalSender: boolean;
  message: string;
  color: string;
  username: string;
  sentAt: number;
};

export type Player = {
  username: string;
  score: number;
};
