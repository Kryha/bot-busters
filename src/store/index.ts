import { create } from "zustand";
import { createMatchSlice, type MatchSlice } from "./match";

export const useStore = create<MatchSlice>()((...args) => ({
  ...createMatchSlice(...args),
}));
