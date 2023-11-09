import { type StateCreator } from "zustand";
import { type MatchSlice } from "./types";

export const createMatchSlice: StateCreator<MatchSlice> = (set) => ({
  matchState: "chat",
  createdAt: null,

  setMatchState: (value) => set(() => ({ matchState: value })),
  setCreatedAt: (value) => set(() => ({ createdAt: value })),
});
