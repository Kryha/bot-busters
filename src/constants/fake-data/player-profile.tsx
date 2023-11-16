import { type PlayerProfileData } from "@/types";

const todayTimestamp = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

export const fakePlayerProfile: PlayerProfileData[] = [
  {
    date: todayTimestamp,
    ranking: 1,
    score: 95,
    gamesPlayed: 10,
    payout: {
      credits: 99,
      state: "potential",
    },
  },
  {
    date: todayTimestamp - oneDay,
    ranking: 2,
    score: 89,
    gamesPlayed: 8,
    payout: { state: "noPayout" },
  },
  {
    date: todayTimestamp - 2 * oneDay,
    ranking: 3,
    score: 92,
    gamesPlayed: 12,
    payout: {
      credits: 48,
      state: "new",
    },
  },
  {
    date: todayTimestamp - 3 * oneDay,
    ranking: 4,
    score: 85,
    gamesPlayed: 7,
    payout: {
      state: "noPayout",
    },
  },
];
