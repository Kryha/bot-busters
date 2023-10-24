import { z } from "zod";

export const chatMessageDataSchema = z.object({
  username: z.string(),
  avatar: z.string(),
  content: z.array(z.string()),
  isLocalUser: z.boolean(),
  time: z.number(),
});

export type ChatMessageData = z.infer<typeof chatMessageDataSchema>;

export const contactListDataSchema = z.object({
  username: z.string(),
  avatar: z.string(),
  lastMessage: z.string(),
  time: z.number(),
});

export type ContactListData = z.infer<typeof contactListDataSchema>;
