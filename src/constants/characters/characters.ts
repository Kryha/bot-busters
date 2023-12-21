import type { Character, CharacterId } from "~/types/index.js";
import { ash, dot, eve, hal, roy } from "~/assets/characters/index.js";

export const CHARACTERS: Record<CharacterId, Character> = {
  1: { id: "1", name: "ash", color: "orange", image: ash },
  2: { id: "2", name: "eve", color: "yellow", image: eve },
  3: { id: "3", name: "hal", color: "green", image: hal },
  4: { id: "4", name: "dot", color: "pink", image: dot },
  5: { id: "5", name: "roy", color: "blue", image: roy },
};
