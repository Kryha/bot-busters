import { z } from "zod";
import type { CharacterId, ChatMessagePayload } from "~/types/index.js";

export type CharacterColor =
  | "orange"
  | "yellow"
  | "green"
  | "pink"
  | "blue"
  | "white";

// TODO: Find a better way to define Character Names for FE that don't include Host
export const feCharacterNameSchema = z.enum([
  "hal",
  "dot",
  "ash",
  "eve",
  "roy",
]);
export type FECharacterName = z.infer<typeof feCharacterNameSchema>;

export const characterNameSchema = z.enum([
  "hal",
  "dot",
  "ash",
  "eve",
  "roy",
  "host",
]);
export type CharacterName = z.infer<typeof characterNameSchema>;

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
