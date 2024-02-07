import { v4 as uuid } from "uuid";

import { env } from "~/env.mjs";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { type Match } from "~/server/service/index.js";
import type {
  CharacterId,
  // CharacterName, // TODO: Implement CharacterNames in payload
  ChatMessagePayload,
  PlayerType,
  PromptMessage,
  SenderRole,
} from "~/types/index.js";
import { wait } from "~/utils/timer.js";
// import { CHARACTERS } from "~/constants/index.js";
export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _match: Match;
  // private _sentMessages: string[] = [];
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
      `If you decided not to reply to the last message just say ${this._silenceToken}.`,
      "exclude any stage directions, action lines, parentheticals, or descriptive text that provides contextual emotional background or physical actions. The dialogue should be straightforward, without annotations on how something is said or any character's non-verbal reactions.",
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

    const message = await this.requestMessageFromLLM();

    // If inference failed or bot decided not to reply, let the agent be silent
    if (!message || message.includes(this._silenceToken)) return;

    const payload: ChatMessagePayload = {
      sender: this.id,
      message,
      sentAt: Date.now(),
    };

    // TODO: remove artificial wait in favour of something more inteligent
    await wait(1500);

    // this._sentMessages.push(payload.message);
    this._match.addMessage(payload);
  }

  private async requestMessageFromLLM() {
    const { messages } = this._match;

    // const latestMessage = messages[messages.length - 1]?.message;
    const promptDialog = messages.map((message): PromptMessage => {
      const promptMessage = {
        role: this.getMessageRole(message.sender),
        // characterName: this.getCharacterName(message.sender as CharacterId),
        content: message.message,
      };

      return promptMessage;
    });

    // TODO Limit amount of messages sent for inference
    // TODO define parameters as constants
    const prompt = this.generatePrompt(promptDialog);

    const body = JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 52, top_p: 0.5, temperature: 0.8 },
    });

    const response = await fetch(env.AWS_INFERENCE_URL, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${env.HUGGING_FACE_TOKEN}`,
      },
      method: "POST",
      body,
      signal: AbortSignal.timeout(10000),
    });

    const textRes = await response.text();

    // TODO Improve error management for fetch
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
    if (sender == this.characterId) return "assistant";
    else return "user";
  }

  // TODO: fix case where sender is "host"
  // private getCharacterName(sender: CharacterId): CharacterName {
  //   const characterName = CHARACTERS[sender]?.name;
  //   return !!characterName ? characterName : "roy";
  // }

  // TODO: Add character name
  generatePrompt(messages: PromptMessage[]): string {
    const hostMessage = messages.shift();
    const systemPrompt = `
    <s>[INST] <<SYS>>
    ${this._systemPrompt}
    <</SYS>>
    ${hostMessage?.content} [/INST]
    `;

    // TODO: Improve prompt construction
    const promptString = messages.reduce((acc, currentMessage) => {
      const nextMessageContent =
        currentMessage.role === "user"
          ? `[INST] ${currentMessage.content} [/INST]`
          : `${currentMessage.content}`;

      return `${acc}${nextMessageContent}\n`;
    }, systemPrompt);

    return `${promptString}</s>`;
  }
}
