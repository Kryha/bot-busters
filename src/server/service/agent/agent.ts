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
  PersonalityTrait,
  PlayerType,
  PromptMessage,
  SenderRole,
  TraitValue,
} from "~/types/index.js";
import { wait } from "~/utils/timer.js";
import { getRandomInt } from "~/utils/math.js";
import { cleanMessage, splitMessage } from "~/utils/messages.js";
import { describePersonality } from "~/server/service/agent/personality-matrix.js";

export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _characterName: CharacterName;
  private _match: Match;
  private _agentPersonality: Record<PersonalityTrait, TraitValue>;
  private _systemPrompt: string;
  private _seed: number;
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
    this._agentPersonality = this.generatePersonality();
    this._systemPrompt = this.generateSystemPrompt();
    this._seed = getRandomInt({ min: 0, max: 2 ^ 48 });

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

    const messagesToSend = splitMessage(cleanResponse, 120); // Split if longer than 110 char

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
        temperature: 0.98, // 0-1 higher value = more creative answers
        max_new_tokens: 70, // 1 token ~ 4 characters
        repetition_penalty: 1.3, // higer prevents repetition in words
        return_full_text: false, // inlcude inpute text in the response
        details: false, // Provide extra debugging details in the response
        stop: ["</s>"], // Prevent further token generation after finding this
        // truncate: 1023, // Max input characters (removes starts of string if reached)
        do_sample: true, // Pick from a probabilitic pool
        seed: this._seed, // 0 - 2^64
        top_k: 39, // limits the pool of next-word candidates to the k most likely words. (20-60)
        top_p: 0.8, // chooses the smallest set of words whose cumulative probability exceeds the value p
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
            ? `${currentMessage.content}`
            : `[INST] ${currentMessage.characterName}: ${currentMessage.content} [/INST]`;

        return `${acc}\n${nextMessageContent}`;
      },
      `host: ${hostMessage?.content}[/INST]`,
    );

    const prompt = `
    <s>[INST] <<SYS>>\n${this._systemPrompt}\n<</SYS>>\n\n${chatHistoryPrompt}\n${this._characterName}:`;

    return prompt;
  }

  private getMessageRole(senderID: string): SenderRole {
    return senderID === this._id ? "assistant" : "user";
  }

  private getCharacterName(characterId: CharacterId): CharacterName {
    return CHARACTERS[characterId].name;
  }

  private generateSystemPrompt(): string {
    const personality = describePersonality(this._agentPersonality);

    return [
      `Your name is ${this._characterName}.`,
      "You only speak in English.",
      "Act like a person participating in a group chat.",
      `${personality}`,
      "You never say that you're AI nor a bot.",
      "Reply in plain text without emojis.",
      "Give short answers, shorter than 45 words.",
      // `If the last message is not relevant for you to reply to, say: ${this._silenceToken}.`,
    ].join(" ");
  }

  private computeShouldTrigger(): boolean {
    const { messages } = this._match;
    const lastMessage = messages.slice(-1)[0];

    let shouldTrigger;

    if (lastMessage?.message.toLowerCase().includes(this._characterName)) {
      shouldTrigger = true; // Always reply if last message has ref to Character Name
    } else {
      shouldTrigger =
        getRandomInt({ min: this._agentPersonality.extraversion, max: 10 }) >=
        5;
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

  private generatePersonality(): Record<PersonalityTrait, TraitValue> {
    return {
      openness: getRandomInt({ min: 1, max: 5 }),
      conscientiousness: getRandomInt({ min: 1, max: 5 }),
      extraversion: getRandomInt({ min: 1, max: 5 }),
      agreeableness: getRandomInt({ min: 1, max: 5 }),
      neuroticism: getRandomInt({ min: 1, max: 5 }),
    };
  }
}
