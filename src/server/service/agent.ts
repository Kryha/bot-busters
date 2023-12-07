import { v4 as uuid } from "uuid";

import type {
  CharacterId,
  ChatMessagePayload,
  PlayerType,
} from "~/types/index.js";
import { type Match } from "~/server/service/index.js";
import { ee, matchEvent } from "~/server/api/match-maker.js";

export class Agent {
  private _id: string;
  private _characterId: CharacterId;
  private _match: Match;
  private _sentMessages: string[] = [];

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
    // TODO: consider that there is more than one agent per chat
    const shouldTrigger = true;

    if (!shouldTrigger) return;

    this._triggeredAt = Date.now();
    const message = await this.requestMessageFromLLM();

    const payload: ChatMessagePayload = {
      sender: this.id,
      message,
      sentAt: Date.now(),
    };

    this._sentMessages.push(payload.message);
    this._match.addMessage(payload);
  }

  private async requestMessageFromLLM() {
    const { messages } = this._match;

    // TODO: uncomment once we use conversational API
    // const pastInputs = messages
    //   .slice(0, messages.length - 1)
    //   .map((msg) => msg.message)
    //   .filter((message) => !this._sentMessages.includes(message));

    const latestMessage =
      messages[messages.length - 1]?.message ?? "Who are you?";

    // TODO: uncomment once we find a correct conversational API
    // const body = JSON.stringify({
    //   inputs: {
    //     past_user_inputs: pastInputs,
    //     generated_responses: this._sentMessages,
    //     text: latestMessage,
    //   },
    //   parameters: { max_new_tokens: 30 },
    // });

    const body = JSON.stringify({
      inputs: latestMessage,
      parameters: { max_new_tokens: 30 },
    });

    const response = await fetch(
      "http://llm-botbusters.kryha.dev:31547/generate",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body,
      }
    );

    const textRes = await response.text();
    const result = JSON.parse(textRes) as { generated_text: string };

    return result.generated_text;
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
      correctGuesses: 0,
      votes: [],
    };
  }
}
