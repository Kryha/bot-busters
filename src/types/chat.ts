import { type ChatMessagePayload } from "~/server/api/match-types";

export interface ChatMessage extends ChatMessagePayload {
  isLocalSender: boolean;
  message: string;
  sentAt: number;
}

export interface MessageData {
  message: ChatMessage;
  character: { name: string; color: string };
}
