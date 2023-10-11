import { type Leaderboard } from "@/types";
import { type StateCreator } from "zustand";

import { leaderboardData } from "./fake-data";

// TODO: define leaderboard

export interface LeaderboardSlice {
  leaderboard: Leaderboard[];

  setLeaderboard: (leaderboard: Leaderboard[]) => void;
}

export const createLeaderboardSlice: StateCreator<
  LeaderboardSlice,
  [],
  [],
  LeaderboardSlice
> = (set) => ({
  leaderboard: leaderboardData,
  setLeaderboard: (leaderboard) => set(() => ({ leaderboard })),
});
