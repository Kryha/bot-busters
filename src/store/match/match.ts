import { type StateCreator } from "zustand";
import { type MatchSlice } from "./types";

export const createMatchSlice: StateCreator<MatchSlice> = (set) => ({
  matchState: "Chat",
  setMatchState: (value) => set(() => ({ matchState: value })),
});
