import { z } from "zod";

import { TOPICS } from "./support.js";

const invalidTextLength = (min: number, max: number) =>
  `Input must be between ${min} and ${max} characters`;

export const validation = {
  textLength: {
    long: {
      max: 4000,
      min: 1,
      error: invalidTextLength(1, 4000),
    },
    short: {
      max: 320,
      min: 1,
      error: invalidTextLength(1, 320),
    },
  },
  invalid: {
    topic: "Please select a valid topic",
    email: "Please enter a valid email",
  },
} as const;

export const knownTopic = (topic: string) => TOPICS.includes(topic);
export const validTopic = z
  .string()
  .min(validation.textLength.short.min)
  .max(validation.textLength.short.max);
export const validEmail = z.string().email();
export const validIssue = z
  .string()
  .min(validation.textLength.long.min)
  .max(validation.textLength.long.max);
