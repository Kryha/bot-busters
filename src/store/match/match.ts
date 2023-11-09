import { type StateCreator } from "zustand";
import { type MatchSlice } from "./types";
import { CHAT_TIME_MS } from "@/constants";

export const createMatchSlice: StateCreator<MatchSlice> = (set) => ({
  matchState: "chat",
  countdown: CHAT_TIME_MS,

  setMatchState: (value) => set(() => ({ matchState: value })),
  setCountdown: (value) => set(() => ({ countdown: value })),
});
