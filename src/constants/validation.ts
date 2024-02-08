import { z } from "zod";

import { TOPICS } from "./support.js";
import { MAX_CHARACTERS_CHAT_MESSAGE } from "./main.js";

const invalidTextLength = (min: number, max: number) =>
  `Input must be between ${min} and ${max} characters`;

export const validation = {
  username: {
    error: {
      space: "Spaces are not allowed",
      tooLong: "Max 12 characters",
      tooShort: "Min 3 characters",
      specialCharacters: "Special characters are not allowed",
      profanity: "Username contains bad language",
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
    chatMessage: {
      max: MAX_CHARACTERS_CHAT_MESSAGE,
      min: 1,
      error: "max 150 characters",
    },
  },
  invalid: {
    topic: "Please select a valid topic",
    email: "Please enter a valid email",
  },
} as const;

export const knownTopic = (topic: string) => TOPICS.includes(topic);

export const validTopicSchema = z
  .string()
  .min(validation.textLength.short.min)
  .max(validation.textLength.short.max);

export const validEmailSchema = z.string().email();

export const validIssueSchema = z
  .string()
  .min(validation.textLength.long.min)
  .max(validation.textLength.long.max);

export const validMessageSchema = z
  .string()
  .max(validation.textLength.chatMessage.max);

export const validUsernameSchema = z
  .string()
  .min(validation.username.min, validation.username.error.tooShort)
  .max(validation.username.max, validation.username.error.tooLong)
  .regex(/^[a-zA-Z0-9_\-.]*$/, validation.username.error.specialCharacters);
