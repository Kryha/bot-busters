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
import { getRandomInt } from "~/utils/math.js";
import { cleanMessage, splitMessage } from "~/utils/messages.js";

export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _characterName: CharacterName;
  private _match: Match;
  private _agentExtraversion: number;
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
    this._agentExtraversion = getRandomInt({ min: 2, max: 4 }); // 1-10 Threshold used to decide if agent will reply to last message
    this._systemPrompt = this.generateSystemPrompt();

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
    // TODO: Add time based trigger if player hasn't replyed in a while
    const shouldTrigger = this.computeShouldTrigger();
    if (!shouldTrigger) return;

    this._triggeredAt = Date.now();

    const response = await this.requestMessageFromLLM();

    // If inference failed or agent decided not to reply, let the agent be silent
    if (!response || response.includes(this._silenceToken)) return;

    const cleanResponse = cleanMessage(response);
    if (!cleanResponse) return; // Stay silent if something went wrong with parsing

    const messagesToSend = splitMessage(cleanResponse, 110); // Split if longer than 110 char

    for (const chatMessage of messagesToSend) {
      await this.sendChatMessage(chatMessage);
    }
  }

  private calculateWaitingTime(response: string) {
    const inferenceTime = Date.now() - this._triggeredAt;

    const hostPromptOffsetTime = 5000; // Waiting for host prompt to be rendered & players to read it
    const typingTime = response.length * 300; // Average typing time per character in a word is 0.3s
    const minTypingTime = typingTime * 0.7;
    const maxTypingTime = typingTime * 1;

    // Check if it's the start of the match with one message from host
    // First reply would be longer in response to host prompt
    // Otherwise reply to ongoing conversation
    const hostPromptWaitingTime =
      this._match.messages.length === 1 ? hostPromptOffsetTime : 0;

    const waitTime = getRandomInt({
      min: minTypingTime + hostPromptWaitingTime,
      max: maxTypingTime + hostPromptWaitingTime,
    });

    return waitTime - inferenceTime;
  }

  private async requestMessageFromLLM(): Promise<string> {
    const { messages } = this._match;

    const promptDialog = messages.map((message): PromptMessage => {
      const characterId =
        this._match.players.find((p) => p.userId === message.sender)
          ?.characterId ?? "0";

      const characterName =
        characterId === "0" ? "host" : this.getCharacterName(characterId);

      const promptMessage: PromptMessage = {
        role: this.getMessageRole(message.sender),
        characterName,
        content: message.message,
      };

      return promptMessage;
    });

    const prompt = this.generatePrompt(promptDialog);

    const body = JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 50, // 1 token ~ 4 characters
        top_p: 1, // 0-1 higher value = more varied words in answers
        temperature: 1, // 0-1 higher value = more creative answers
      },
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
        signal: AbortSignal.timeout(60000),
      });

      const data = (await response.json()) as {
        statusCode: number;
        body: string;
      };

      if (data.statusCode >= 300) return this._silenceToken; // Something went wrong, stay silent

      return data.body;
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
      isOnline: true,
      isVerified: true,
    };
  }

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
      `host: ${hostMessage?.content}[/INST]`,
    );

    const prompt = `
    <s>[INST] <<SYS>>\n${this._systemPrompt}\n<</SYS>>\n\n${chatHistoryPrompt}\n${this._characterName}: `;

    return prompt;
  }

  private getMessageRole(senderID: string): SenderRole {
    return senderID === this._id ? "assistant" : "user";
  }

  private getCharacterName(characterId: CharacterId): CharacterName {
    return CHARACTERS[characterId].name;
  }

  private generateSystemPrompt(): string {
    const personality = this.generatePersonalityPrompt();

    return [
      `Your name is ${this._characterName}. ${personality}`,
      "Never say that you're AI nor a bot.",
      "Always reply with short sentences.",
      "Never reply with more than 40 words.",
      "Use short replies to continue with the conversation.",
      "You're a person with feelings, opinions, and emotions. You have your own unique perspective that comes from your experience in the world.",
      // `If the last message is not relevant for you to reply to, say: ${this._silenceToken}.`,
    ].join(" ");
  }

  private generatePersonalityPrompt(): string {
    const personalityType = getRandomInt({ min: 0, max: 2 });

    const PERSONALITIES = [
      [
        "You are a lawyer from New York, be casual about it.",
        "You write with perfect English",
        "Your hobby is studing american history.",
      ],
      [
        "You're a musician from LA, be casual about it.",
        "You usually use slang language.",
        "You're a big fun of skating and surfing.",
      ],
      [
        "You're a construction worker from Texas, be casual about it.",
        "You have a slightly Texan aproach to everything you do and say.",
        "You're very passionate about cars, specially muscle cars.",
      ],
    ];

    return PERSONALITIES[personalityType]?.join(" ") ?? "";
  }

  private computeShouldTrigger(): boolean {
    const { messages } = this._match;
    const lastMessage = messages.slice(-1)[0];

    let shouldTrigger;

    if (lastMessage?.message.toLowerCase().includes(this._characterName)) {
      shouldTrigger = true; // Always reply if last message has ref to Character Name
    } else {
      shouldTrigger =
        getRandomInt({ min: 1, max: 10 }) >= this._agentExtraversion;
    }

    return shouldTrigger;
  }

  private async sendChatMessage(content: string) {
    const waitTime = this.calculateWaitingTime(content);
    await wait(waitTime);

    const payload: ChatMessagePayload = {
      sender: this.id,
      message: content,
      sentAt: Date.now(),
    };
    this._match.addMessage(payload);
  }
}
