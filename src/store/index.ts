import { create } from "zustand";
import { createMatchSlice, type MatchSlice } from "./match";

export const useStore = create<MatchSlice>()((...a) => ({
  ...createMatchSlice(...a),
}));
