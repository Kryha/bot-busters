import { type StateCreator } from "zustand";
import { type MatchSlice } from "./types";

export const createMatchSlice: StateCreator<MatchSlice> = (set) => ({
  createdAt: undefined,

  setCreatedAt: (value) => set(() => ({ createdAt: value })),
});
