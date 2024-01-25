import { type AchievementId } from "~/types/index.js";

export const PUBLIC_KEY_LENGTH = 63;
export const PLACEHOLDER_TEXT = "botBusters";
export const AUTH_SIGN_MESSAGE = "Sign in to Bot Busters";
export const APP_NAME = "Bot Busters";

export const CHAT_TIME_MS = 180000; // 3 minutes
export const MATCH_TIME_MS = 600000; // 10 minutes
export const ALERT_TIME_MS = 30000;
export const VOTING_TIME_MS = 60000;

export const SPLASH_SCREEN_DURATION = 3000; // 3 seconds

export const DEFAULT_MAX_PLAYERS_PER_ROOM = 5;

/* MATERIAL UI  */
export const FONT_SIZE = 16;
export const COEFFICIENT = 14;

export const CHIP_TIMEOUT = 4000;

export const POINTS_BOT_BUSTED = 11;
export const POINTS_HUMAN_BUSTED = 10;
export const POINTS_ACHIEVEMENTS: Record<AchievementId, number> = {
  "11": 1,
  "12": 5,
  "13": 5,
  "101": 9,
  "201": 5,
  "202": 5,
};
