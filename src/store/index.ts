import { create } from "zustand";

import { type LeaderboardSlice, createLeaderboardSlice } from "./leaderboard";
import { type ChatSlice, createChatSlice } from "./chat";

// TODO: add global app slices
export const useGlobalStore = create<ChatSlice>()((...a) => ({
  ...createChatSlice(...a),
}));

// TODO: add other leaderboard slices
export const useLeaderboardStore = create<LeaderboardSlice>()((...a) => ({
  ...createLeaderboardSlice(...a),
}));
