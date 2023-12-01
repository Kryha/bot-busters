import { type ChatMessagePayload } from "~/server/api/match-types";

export interface ChatMessage extends ChatMessagePayload {
  isLocalSender: boolean;
}

export interface MessageData {
  message: ChatMessage;
  character: { name: string; color: string };
}
