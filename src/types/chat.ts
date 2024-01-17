import type { CharacterId, ChatMessagePayload } from "~/types/index.js";

export type CharacterColor = "orange" | "yellow" | "green" | "pink" | "blue";
export type CharacterName = "ash" | "hal" | "roy" | "eve" | "dot";

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
  character: { name: CharacterName; color: string };
}
