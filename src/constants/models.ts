import { type AgentModels } from "~/types";

// To add more models, upgrade inference-lambda-bedrock file and re-deploy it
export const AGENT_MODEL: AgentModels = {
  LLAMA_2_13B: "meta.llama2-13b-chat-v1",
  LLAMA_2_70B: "meta.llama2-70b-chat-v1",
  LLAMA_3_8B: "meta.llama3-8b-instruct-v1:0",
  LLAMA_3_70B: "meta.llama3-70b-instruct-v1:0",
  CLAUDE__3_5_SONNET: "anthropic.claude-3-5-sonnet-20240620-v1:0",
};
