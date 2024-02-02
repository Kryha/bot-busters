import { z } from "zod";

import { TOPICS } from "./support.js";
import { profanityFilter } from "~/service/index.js";

const invalidTextLength = (min: number, max: number) =>
  `Input must be between ${min} and ${max} characters`;

export const validation = {
  username: {
    error: {
      space: "Spaces are not allowed",
      length: invalidTextLength(3, 12),
      profanity: "Username contains bad language please choose a different one",
    },
    max: 12,
    min: 3,
  },
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

export const validUsername = z
  .string()
  .min(validation.username.min)
  .max(validation.username.max);
