import { z } from "zod";

export const decisionTypeSchema = z.enum(["human", "bot"]);

export type DecisionType = z.infer<typeof decisionTypeSchema>;
