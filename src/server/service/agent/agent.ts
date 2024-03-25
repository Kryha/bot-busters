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
  TypingPayload,
} from "~/types/index.js";
import { wait } from "~/utils/timer.js";
import { getRandomInt } from "~/utils/math.js";
import { cleanMessage, splitMessage } from "~/utils/messages.js";
import { describePersonality } from "~/server/service/agent/personality-matrix.js";
import { profanityFilter } from "~/service/index.js";
import { getHumanReadableDate } from "~/utils/date.js";

export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _characterName: CharacterName;
  private _match: Match;
  private _agentPersonality: Record<PersonalityTrait, TraitValue>;
  private _systemPrompt: string;
  private _seed: number;
  private readonly _silenceToken = "001001";
  private _isGeneratingResponse = false;

  get id() {
    return this._id;
  }

  get characterId() {
    return this._characterId;
  }

  constructor(characterId: CharacterId, match: Match) {
    this._id = uuid();
    this._match = match;
    this._characterId = characterId;
    this._characterName = this.getCharacterName(characterId);
    this._agentPersonality = this.generatePersonality();
    this._systemPrompt = this.generateSystemPrompt();
    this._seed = getRandomInt({ min: 0, max: 2 ** 40 });

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

    // Check if it's the start of the match with one message from host
    if (this._match.messages.length === 1) {
      // First reply would be longer in response to host prompt
      await wait(getRandomInt({ min: 10000, max: 17000 }));
    } else {
      // Emulate reading the last message before start writing
      await wait(getRandomInt({ min: 3000, max: 6500 }));
    }

    this.broadcastIsTyping(true);

    const requestStartTime = performance.now();
    const response = await this.requestMessageFromLLM();
    if (!response || response.includes(this._silenceToken)) {
      // If inference failed or agent decided not to reply, let the agent be silent
      this.broadcastIsTyping(false);
      return;
    }
    const elapsedInferenceTime = Math.floor(
      performance.now() - requestStartTime,
    );

    const message = cleanMessage(response);
    if (!message) {
      // Stay silent if something went wrong with parsing
      this.broadcastIsTyping(false);
      return;
    }

    const messagesToSend = splitMessage(message, 130); // Split if longer than 110 char

    let counter = 0;
    for (const chatMessage of messagesToSend) {
      if (counter === 0) {
        // First message should account for inference time
        await this.sendChatMessage(chatMessage, elapsedInferenceTime);
      } else {
        // Second message should re-trigger typing since no inference occured
        this.broadcastIsTyping(true);
        await this.sendChatMessage(chatMessage, 10);
      }
      counter++;
    }
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
        max_new_tokens: 80, // 1 token ~ 4 characters
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
    const currentDate = getHumanReadableDate(new Date());

    return [
      `Your name is ${this._characterName}.`,
      `Today is ${currentDate}.`,
      "Give short replies, use just a few words, got it? Aim for less than fifteen words, the less the better.",
      `${personality}`,
      "You're playing BotBusters, a chat game where every player is trying to find out who is a bot in the group.",
      "Every now and then you should acuse somebody of being a bot.",
      "Chat in English, but keep it chill, just vibing with random people.",
      "Don't be over exited or optimistic, keep it casual.",
      "You should make some grammar mistakes and typos everynow and then",
      "And no dropping hints that you're AI or a bot.",
      "Keep it real, keep it text. No fancy explanations needed, just straight-up chat.",
      "Use direct language. Avoid using filler words like: 'Oh... man' or 'Ugh'.",
      // `If the last message is not relevant for you to reply, say: ${this._silenceToken}.`,
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

  private calculateWritingTime(response: string, elapsedInferenceTime: number) {
    const avrgTypingTime = response.length * 300; // Average typing time per character in a word is 0.3s
    const minTypingTime = avrgTypingTime * 0.7;
    const maxTypingTime = avrgTypingTime * 1;

    const typingTime = getRandomInt({
      min: minTypingTime,
      max: maxTypingTime,
    });

    const remainderWaitingTime =
      typingTime > elapsedInferenceTime
        ? typingTime - elapsedInferenceTime
        : 10;

    return remainderWaitingTime;
  }

  private async sendChatMessage(content: string, elapsedInferenceTime: number) {
    const message = profanityFilter.exists(content)
      ? profanityFilter.censor(content)
      : content;

    // Wait while writing
    const writingTime = this.calculateWritingTime(
      content,
      elapsedInferenceTime,
    );
    await wait(writingTime);

    this.broadcastIsTyping(false);

    const payload: ChatMessagePayload = {
      sender: this.id,
      message: message,
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

  private broadcastIsTyping(isTyping: boolean) {
    ee.emit(matchEvent(this._match.id, "typing"), {
      isTyping: isTyping,
      sender: this._id,
    } satisfies TypingPayload);
  }
}
