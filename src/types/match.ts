import { z } from "zod";

export const matchStateSchema = z.enum(["CHAT", "VOTING", "RESULTS"]);

export type MatchStateType = z.infer<typeof matchStateSchema>;
