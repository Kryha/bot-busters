import { z } from "zod";

export const chatMessageSchema = z.object({
  username: z.string(),
  avatar: z.string(),
  content: z.array(z.string()),
  isLocalUser: z.boolean(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const contactListSchema = z.object({
  username: z.string(),
  avatar: z.string(),
  lastMessage: z.string(),
  time: z.string(),
});

export type ContactList = z.infer<typeof contactListSchema>;
