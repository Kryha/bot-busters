import { v4 as uuid } from "uuid";
import fetch from "node-fetch";

import { CHARACTERS } from "~/constants/index.js";
import { env } from "~/env.mjs";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { type Match } from "~/server/service/index.js";
import type {
  CharacterId,
  CharacterName,
  ChatMessagePayload,
  PlayerType,
  PromptMessage,
  SenderRole,
} from "~/types/index.js";
import { wait } from "~/utils/timer.js";

export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _characterName: CharacterName;
  private _match: Match;
  private _systemPrompt: string;

  private _triggeredAt = Date.now();
  private readonly _silenceToken = "001001";
  private _isGeneratingResponse = false;

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
    this._characterName = this.getCharacterName(characterId);
    this._systemPrompt = [
      `Your name is ${this._characterName}.`,
      "You're participating in a group chat.",
      "You're a normal person. Always reply as a normal person would do.",
      "You don't have a lot of knowledge of the world.",
      "You always reply with short sentences that don't excede 150 characters.",
      `You always reply if someone mentiones your name: ${this._characterName}`,
      // `First decide if you would reply, otherwise say: ${this._silenceToken}.`,
    ].join(" ");

    ee.on(matchEvent(match.id), this.handleMessageEvent);
  }

  handleMessageEvent = (latestMessage: ChatMessagePayload) => {
    if (latestMessage.sender === this._id || this._isGeneratingResponse) return;

    this._isGeneratingResponse = true;

    this.triggerResponse()
      .then(() => {
        this._isGeneratingResponse = false;
      })
      .catch((error) => {
        this._isGeneratingResponse = false;
        console.error("Error handling agent message:", error);
      });
  };

  private async triggerResponse() {
    // TODO: perform actual logic to understand if response should be triggered or not
    const shouldTrigger = Math.random() < 0.5;
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
    const waitTime = this._match.messages.length === 1 ? 9000 : 6500;
    await wait(waitTime);

    this._match.addMessage(payload);
  }

  private async requestMessageFromLLM() {
    const { messages } = this._match;

    const promptDialog = messages.map((message): PromptMessage => {
      const characterId =
        this._match.players.find((p) => p.userId === message.sender)
          ?.characterId ?? "0";

      // TODO: fix "host" sender
      const characterName =
        characterId === "0" ? "host" : this.getCharacterName(characterId);

      const promptMessage: PromptMessage = {
        role: this.getMessageRole(message.sender),
        characterName,
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

    const authorizationToken = env.LAMBDA_TOKEN.replace(/\r?\n|\r/g, "");

    try {
      const response = await fetch(env.AWS_INFERENCE_URL, {
        headers: {
          "content-type": "application/json",
          authorizationToken,
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
    } catch (error) {
      console.error(error);
      return this._silenceToken;
    }
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
      humansFooled: 0,
      humansFooledScore: 0,
      botsBustedScore: 0,
      humansBustedScore: 0,
      correctGuesses: 0,
      votes: [],
      achievements: [],
    };
  }

  private getMessageRole(senderID: string): SenderRole {
    return senderID === this._id ? "assistant" : "user";
  }

  private getCharacterName(characterId: CharacterId): CharacterName {
    return CHARACTERS[characterId].name;
  }

  // TODO: Add character name
  generatePrompt(messages: PromptMessage[]): string {
    // First message is always from Host
    const hostMessage = messages.shift();

    const chatHistoryPrompt = messages.reduce(
      (acc, currentMessage) => {
        const nextMessageContent =
          currentMessage.role === "assistant"
            ? `${currentMessage.characterName}: ${currentMessage.content}`
            : `[INST] ${currentMessage.characterName}: ${currentMessage.content} [/INST]`;

        return `${acc}\n${nextMessageContent}`;
      },
      `${hostMessage?.content}[/INST]`,
    );

    const systemPrompt = `
    <s>[INST] <<SYS>>\n${this._systemPrompt}\n<</SYS>>\n${chatHistoryPrompt}\n${this._characterName}: `;

    return systemPrompt;
  }

  parseResponse(input: string): string {
    // Removes //ufffd || </s> || *some expresion* || [INST]
    return input.replace(/(\ufffd|<\/s>|(\*[^*]*\*)|\[INST\]|\[\/INST\])/g, "");
  }
}
