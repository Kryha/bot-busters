import { z } from "zod";
import { characterNameSchema } from "~/types/index.js";

const promptMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  characterName: characterNameSchema.or(z.literal("host")),
  content: z.string(),
});
export type PromptMessage = z.infer<typeof promptMessageSchema>;

const senderRoleSchema = z.enum(["system", "user", "assistant"]);
export type SenderRole = z.infer<typeof senderRoleSchema>;
