import { type AchievementId } from "~/types/index.js";

export const PUBLIC_KEY_LENGTH = 63;
export const PLACEHOLDER_TEXT = "botBusters";
export const AUTH_SIGN_MESSAGE = "Sign in to Bot Busters";
export const APP_NAME = "Bot Busters";

export const CHAT_TIME_MS = 180000; // 3 minutes
export const MATCH_TIME_MS = 600000; // 10 minutes
export const ALERT_TIME_MS = 30000; // 30 seconds
export const VOTING_TIME_MS = 30000; // 1 minute
export const SPLASH_SCREEN_TIME_MS = 6500; // 6.5 seconds
export const SPLASH_SCREEN_TEXT_DELAY_MS = 500; // 0.5 seconds
export const MATCHMAKING_DELAY_MS = 1800; // 1.8 seconds

// TODO: decide final value
export const WINNING_RANK = 100;

export const DEFAULT_MAX_PLAYERS_PER_ROOM = 5;

export const MAX_CHARACTERS_CHAT_MESSAGE = 160;

/* MATERIAL UI  */
export const FONT_SIZE = 16;
export const COEFFICIENT = 14;

export const CHIP_TIMEOUT = 4000;

export const POINTS_BOT_BUSTED = 11;
export const POINTS_HUMAN_BUSTED = 10;
export const POINTS_HUMAN_FOOLED = 5;

export const POINTS_ACHIEVEMENTS: Record<AchievementId, number> = {
  dailyStreakCounter: 0,
  goodBust: 5,
  busterStreak: 9,
  fiveDayStreak: 9,
  firstTimer: 5,
  beginnersLuck: 5,
  realHuman: 5,
  masterBuster: 9,
};

// run the entire animation once, then infinitely loop the second half
export const BOT_BUSTED_ANIMATION_SEGMENT = [
  [0, 120],
  [58, 120],
];
export const BOT_WIN_ANIMATION_SEGMENT = [
  [0, 96],
  [47, 96],
];

export const BOTBUSTERS_LOGO_ANIMATION_SEGMENT = [
  [0, 96],
  [47, 96],
];

export const LANDING_PAGE_ANIMATION_SEGMENT = [
  [240, 480],
  [240, 480],
];

export const ONE_TIME_ACHIEVEMENTS: AchievementId[] = [
  "beginnersLuck",
  "realHuman",
  "firstTimer",
  "busterStreak",
  "dailyStreakCounter",
  "fiveDayStreak",
  "masterBuster",
];

export const EMPTY_RES = "empty";

export const AUDIO_ON = 1;
export const AUDIO_OFF = 0;

export const DEFAULT_MASTER_VOLUME = 1;
export const DEFAULT_MUSIC_VOLUME = 0.5;
export const DEFAULT_SFX_VOLUME = 1;
