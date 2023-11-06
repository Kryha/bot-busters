import { z } from "zod";

export const matchStateSchema = z.enum(["chat", "voting", "results"]);

export type MatchStateType = z.infer<typeof matchStateSchema>;
