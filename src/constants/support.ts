export const TOPICS = ["general", "suggestion", "bug"];
export const SUPPORT_TOPIC = [...TOPICS] as const;
export type SupportTopic = typeof SUPPORT_TOPIC;
