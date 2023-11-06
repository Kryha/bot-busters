import { z } from "zod";

export const matchStateSchema = z.enum(["Chat", "Voting", "Results"]);

export type MatchStateType = z.infer<typeof matchStateSchema>;
