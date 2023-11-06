import { z } from "zod";

export const matchStateSchema = z.enum(["CHAT", "VOTING", "RESULTS"]);

export type MatchStateType = z.infer<typeof matchStateSchema>;

export interface MatchSlice {
  matchState: MatchStateType;
  setMatchState: (newState: MatchStateType) => void;
}
