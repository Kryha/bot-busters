import { z } from "zod";

export const updateScoreArgsSchema = z.object({
  userIds: z.array(z.string().endsWith("field")),
  scores: z.array(z.string().endsWith("u64")),
  slice: z.string().endsWith("u8"),
});
export type UpdateScoreArgs = z.infer<typeof updateScoreArgsSchema>;
