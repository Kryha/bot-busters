import { v4 as uuid } from "uuid";

import { env } from "~/env.mjs";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { type Match } from "~/server/service/index.js";
import type {
  CharacterId,
  ChatMessagePayload,
  PlayerType,
  PromptMessage,
  SenderRole,
} from "~/types/index.js";
import { wait } from "~/utils/timer.js";
export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _match: Match;
  private _systemPrompt: string;

  private _triggeredAt = Date.now();
  private _silenceToken = "001001";

  get id() {
    return this._id;
  }

  get characterId() {
    return this._characterId;
  }

  get triggeredAt() {
    return this._triggeredAt;
  }

  constructor(characterId: CharacterId, match: Match) {
    this._id = uuid();
    this._match = match;
    this._characterId = characterId;
    // TODO Add character Name & Personality
    this._systemPrompt = [
      "You're a normal person. Always reply as a normal person would do.",
      "You don't have a lot of knowledge of the world.",
      "You always reply with short sentences that don't excede 150 characters.",
      // `If you decided not to reply to the last message just say ${this._silenceToken}.`,
    ].join(" ");

    ee.on(matchEvent(match.id), this.handleMessageEvent);
  }

  handleMessageEvent = (latestMessage: ChatMessagePayload) => {
    if (latestMessage.sender === this._id) return;

    this.triggerResponse().catch((error) => {
      console.error("Error handling agent message:", error);
    });
  };

  async triggerResponse() {
    // TODO: perform actual logic to understand if response should be triggered or not
    const shouldTrigger = true;
    if (!shouldTrigger) return;

    this._triggeredAt = Date.now();

    const response = await this.requestMessageFromLLM();

    // If inference failed or bot decided not to reply, let the agent be silent
    if (!response || response.includes(this._silenceToken)) return;

    const cleanResponse = this.parseResponse(response);

    const payload: ChatMessagePayload = {
      sender: this.id,
      message: cleanResponse,
      sentAt: Date.now(),
    };

    // TODO: remove artificial wait in favour of something more inteligent
    if (this._match.messages.length === 1)
      await wait(4500); // Wait longer if replying to Host Prompt
    else await wait(1500);

    this._match.addMessage(payload);
  }

  private async requestMessageFromLLM() {
    const { messages } = this._match;

    const promptDialog = messages.map((message): PromptMessage => {
      const promptMessage = {
        role: this.getMessageRole(message.sender),
        // characterName: this.getCharacterName(message.sender as CharacterId),
        content: message.message,
      };

      return promptMessage;
    });

    // TODO Limit amount of messages sent for inference
    const prompt = this.generatePrompt(promptDialog);

    const body = JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 58, top_p: 1, temperature: 0.8 }, // TODO define final parameters as constants
    });

    const response = await fetch(env.AWS_INFERENCE_URL, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${env.AWS_TOKEN}`,
      },
      method: "POST",
      body,
      signal: AbortSignal.timeout(10000),
    });

    const textRes = await response.text();

    if (!textRes) return this._silenceToken;

    const result = JSON.parse(textRes) as { body: string };
    const responseBody = JSON.parse(result.body) as string;

    return responseBody;
  }

  cleanup() {
    ee.off(matchEvent(this._match.id), this.handleMessageEvent);
  }

  toPlayer(): PlayerType {
    return {
      userId: this.id,
      characterId: this.characterId,
      score: 0,
      isBot: true,
      isScoreSaved: false,
      botsBusted: 0,
      totalBotsBusted: 0,
      humansBusted: 0,
      botsBustedScore: 0,
      humansBustedScore: 0,
      correctGuesses: 0,
      votes: [],
      achievements: [],
    };
  }

  private getMessageRole(sender: string): SenderRole {
    if (sender == this._id) return "assistant";
    else return "user";
  }

  // TODO: fix case where sender is "host"
  // private getCharacterName(sender: CharacterId): CharacterName {
  //   const characterName = CHARACTERS[sender]?.name;
  //   return !!characterName ? characterName : "roy";
  // }

  // TODO: Add character name
  generatePrompt(messages: PromptMessage[]): string {
    // First message is always from Host
    const hostMessage = messages.shift();

    const chatHistoryPrompt = messages.reduce(
      (acc, currentMessage) => {
        const nextMessageContent =
          currentMessage.role === "assistant"
            ? `${currentMessage.content}`
            : `[INST] ${currentMessage.content} [/INST]`;

        return `${acc}\n${nextMessageContent}`;
      },
      `[INST]${hostMessage?.content}[/INST]`,
    );

    const systemPrompt = `
    <s>[INST] <<SYS>>\n${this._systemPrompt}\n<</SYS>>\n${chatHistoryPrompt}`; // TODO: add <charName>:  as ending for the instruction

    return systemPrompt;
  }

  parseResponse(input: string): string {
    // Removes //ufffd || </s> || *some expresion* || [INST]
    return input.replace(/(\ufffd|<\/s>|(\*[^*]*\*)|\[INST\]|\[\/INST\])/g, "");
  }
}
