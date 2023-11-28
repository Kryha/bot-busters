import { type ChatMessagePayload } from "~/server/api/match-types";

export interface LocalMessage extends ChatMessagePayload {
  isLocalSender: boolean;
}
