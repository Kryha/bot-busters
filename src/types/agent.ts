import { z } from "zod";
import { characterNameSchema } from "~/types/index.js";

const promptMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  characterName: characterNameSchema.or(z.literal("host")),
  content: z.string(),
});
export type PromptMessage = z.infer<typeof promptMessageSchema>;

const conversationMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.array(z.object({ text: z.string() })),
});
export type ConversationMessage = z.infer<typeof conversationMessageSchema>;

const systemPromptSchema = z.array(z.object({ text: z.string() }));
export type SystemPrompt = z.infer<typeof systemPromptSchema>;

const senderRoleSchema = z.enum(["system", "user", "assistant"]);
export type SenderRole = z.infer<typeof senderRoleSchema>;

const personalityTraitSchema = z.enum([
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "neuroticism",
]);
export type PersonalityTrait = z.infer<typeof personalityTraitSchema>;

const traitValueSchema = z.number().min(1).max(5);
export type TraitValue = z.infer<typeof traitValueSchema>;

const traitDescriptionsSchema = z.record(traitValueSchema, z.string());
export type TraitDescriptions = z.infer<typeof traitDescriptionsSchema>;

const inferenceReqBodySchema = z.object({
  modelId: z.string(),
  messages: z.array(conversationMessageSchema),
  inferenceConfig: z.object({
    maxTokens: z.number(),
    temperature: z.number(),
    topP: z.number(),
  }),
  system: z.string(),
});
export type InferenceReqBody = z.infer<typeof inferenceReqBodySchema>;
