import { type CharacterId } from "~/server/api/match-types.js";
import { type Character } from "~/types/chat.js";

export const CHARACTERS: Record<CharacterId, Character> = {
  1: { id: "1", name: "orange orangutan", color: "orange" },
  2: { id: "2", name: "brown bear", color: "brown" },
  3: { id: "3", name: "green gator", color: "green" },
  4: { id: "4", name: "pink panda", color: "pink" },
  5: { id: "5", name: "blue bird", color: "blue" },
};
