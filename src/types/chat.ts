import type { CharacterId, ChatMessagePayload } from "~/types/index.js";
import { type StaticImageData } from "next/image";

export type CharacterColor = "orange" | "yellow" | "green" | "pink" | "blue";
export type CharacterName = "ash" | "eve" | "hal" | "dot" | "roy";

export interface Character {
  id: CharacterId;
  name: CharacterName;
  color: CharacterColor;
  image?: StaticImageData;
}

export interface ChatMessage extends ChatMessagePayload {
  isLocalSender: boolean;
}

export interface MessageData {
  message: ChatMessage;
  character: { name: string; color: string };
}
