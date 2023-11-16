import { type MatchStateType } from "@/types";

export interface MatchSlice {
  matchState: MatchStateType;
  createdAt?: number;

  setMatchState: (newState: MatchStateType) => void;
  setCreatedAt: (createdAt: number) => void;
}
