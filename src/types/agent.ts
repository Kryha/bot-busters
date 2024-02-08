import { z } from "zod";

// TODO: Fix role type declaration
const promptMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  //   characterName: z.enum(["hal", "dot", "ash", "eve", "roy", "host"]),
  content: z.string(),
});
export type PromptMessage = z.infer<typeof promptMessageSchema>;

const senderRoleSchema = z.enum(["system", "user", "assistant"]);
export type SenderRole = z.infer<typeof senderRoleSchema>;
