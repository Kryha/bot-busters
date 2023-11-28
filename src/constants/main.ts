import { type Character } from "~/server/api/match-types";

export const PUBLIC_KEY_LENGTH = 63;
export const PLACEHOLDER_TEXT = "botBusters";
export const AUTH_SIGN_MESSAGE = "Sign in to Bot Busters";
export const APP_NAME = "Bot Busters";

export const CHAT_TIME_MS = 180000; // 3 minutes
export const MATCH_TIME_MS = 600000; // 10 minutes
export const ALERT_TIME_MS = 30000;
export const VOTING_TIME_MS = 60000;

export const SPLASH_SCREEN_DURATION = 3000; // 3 seconds

/* MATERIAL UI  */
export const FONT_SIZE = 16;
export const COEFFICIENT = 14;

/* CHAT */
export const COLORS = ["orange", "brown", "green", "pink"];

export const CHIP_TIMEOUT = 4000;

export const CHARACTERS: Character[] = [
  {
    id: 1,
    characterName: "orange orangutan",
    color: "orange",
  },
  { id: 2, characterName: "brown bear", color: "brown" },
  { id: 3, characterName: "green gator", color: "green" },
  { id: 4, characterName: "pink panda", color: "pink" },
  { id: 5, characterName: "blue bird", color: "blue" },
];
