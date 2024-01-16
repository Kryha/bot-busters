import type { Character, CharacterId } from "~/types/index.js";

export const MATCH_HOST = "host";

export const CHARACTERS: Record<CharacterId, Character> = {
  1: { id: "1", name: "ash", color: "orange" },
  2: { id: "2", name: "eve", color: "yellow" },
  3: { id: "3", name: "hal", color: "green" },
  4: { id: "4", name: "dot", color: "pink" },
  5: { id: "5", name: "roy", color: "blue" },
};
