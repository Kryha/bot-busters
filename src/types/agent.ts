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
