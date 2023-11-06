import { type StateCreator } from "zustand";
import { type MatchSlice } from "./types";

export const createMatchSlice: StateCreator<MatchSlice> = (set) => ({
  matchState: "chat",
  setMatchState: (value) => set(() => ({ matchState: value })),
});
