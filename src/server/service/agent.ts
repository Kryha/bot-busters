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
    this._agentExtraversion = getRandomInt({ min: 4, max: 6 }); // 1-10 Threshold used to decide if agent will reply to last message
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
    const shouldTrigger =
      getRandomInt({ min: 1, max: 10 }) >= this._agentExtraversion;
    if (!shouldTrigger) return;

    this._triggeredAt = Date.now();

    const response = await this.requestMessageFromLLM();

    // If inference failed or bot decided not to reply, let the agent be silent
    if (!response || response.includes(this._silenceToken)) return;

    const cleanResponse = this.parseLLMResponse(response);
    if (!cleanResponse) return; // Stay silent if something went wrong with parsing

    const waitTime = this.calculateWaitingTime(cleanResponse);
    await wait(waitTime);

    const payload: ChatMessagePayload = {
      sender: this.id,
      message: cleanResponse,
      sentAt: Date.now(),
    };
    this._match.addMessage(payload);
  }

  private calculateWaitingTime(response: string) {
    const inferenceTime = Date.now() - this._triggeredAt;

    const hostPromptOffsetTime = 6000; // Waiting for host prompt to be rendered & players to read it
    const typingTime = response.length * 275; // Average typing time per character in a word is 0.3s
    const minTypingTime = typingTime * 0.8;
    const maxTypingTime = typingTime * 1;

    const waitTime =
      this._match.messages.length === 1 // Check if it's the start of the match with one message from host
        ? getRandomInt({
            min: minTypingTime + hostPromptOffsetTime,
            max: maxTypingTime + hostPromptOffsetTime,
          }) // First reply would be longer in response to host prompt
        : getRandomInt({
            min: minTypingTime,
            max: maxTypingTime,
          }); // Otherwise reply to ongoing conversation

    return waitTime - inferenceTime;
  }

  private async requestMessageFromLLM() {
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
        max_new_tokens: 58, // amount of words generated
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

  parseLLMResponse(input: string): string {
    // Removes //ufffd || </s> || *some expresion* || [INST] || (words in parenthesis)
    return input.replace(
      /(\ufffd|<\/s>|(\*[^*]*\*)|\[INST\]|\[\/INST\]|\[INST(?:\])?|\([^)]*\))/g,
      "",
    );
  }

  private getMessageRole(senderID: string): SenderRole {
    return senderID === this._id ? "assistant" : "user";
  }

  private getCharacterName(characterId: CharacterId): CharacterName {
    return CHARACTERS[characterId].name;
  }

  private generateSystemPrompt(): string {
    return [
      `Your name is ${this._characterName}.`,
      "Never say that you're AI nor a bot.",
      "Always reply with short sentences. Use quick replies to keep up with a conversatio or full sentences that don't excede 40 words.",
      "Use slang language sometimes.",
      // `First decide if you would reply, otherwise say: ${this._silenceToken}.`,
    ].join(" ");
  }
}
