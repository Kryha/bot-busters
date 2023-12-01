import type {
  ChatMessagePayload,
  CharacterId,
} from "~/server/api/match-types.js";

export type CharacterColor = "orange" | "brown" | "green" | "pink" | "blue";
export type CharacterName =
  | "orange orangutan"
  | "brown bear"
  | "green gator"
  | "pink panda"
  | "blue bird";

export interface Character {
  id: CharacterId;
  name: CharacterName;
  color: CharacterColor;
}

export interface ChatMessage extends ChatMessagePayload {
  isLocalSender: boolean;
}

export interface MessageData {
  message: ChatMessage;
  character: { name: string; color: string };
}
