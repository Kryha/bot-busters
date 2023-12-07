import { v4 as uuid } from "uuid";

import type {
  CharacterId,
  ChatMessagePayload,
  PlayerType,
} from "~/types/index.js";
import { type Match } from "~/server/service/index.js";

export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _match: Match;

  private _triggeredAt = Date.now();

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
  }

  async triggerResponse() {
    const message = await this.requestMessageFromLLM();
    this._triggeredAt = Date.now();

    const payload: ChatMessagePayload = {
      sender: this.id,
      message,
      sentAt: Date.now(),
    };

    this._match.addMessage(payload);
  }

  private async requestMessageFromLLM() {
    console.log("Message history length:", this._match.messages.length);

    // TODO: make actual call to LLM process
    const message = await Promise.resolve("Definitely not a bot...");
    return message;
  }

  toPlayer(): PlayerType {
    return {
      userId: this.id,
      characterId: this.characterId,
      score: 0,
      isBot: true,
      isScoreSaved: false,
      botsBusted: 0,
      correctGuesses: 0,
      votes: [],
    };
  }
}
