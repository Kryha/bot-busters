import { type MatchStateType } from "@/types";

export interface MatchSlice {
  matchState: MatchStateType;
  countdown: number;

  setMatchState: (newState: MatchStateType) => void;
  setCountdown: (countdown: number) => void;
}
