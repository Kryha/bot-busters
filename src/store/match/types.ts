import { type MatchStateType } from "@/types";

export interface MatchSlice {
  matchState: MatchStateType;
  setMatchState: (newState: MatchStateType) => void;
}
