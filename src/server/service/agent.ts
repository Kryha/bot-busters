import { v4 as uuid } from "uuid";

import type {
  CharacterId,
  ChatMessagePayload,
  PlayerType,
} from "~/types/index.js";
import { type Match } from "~/server/service/index.js";
import { ee, matchEvent } from "~/server/api/match-maker.js";
import { env } from "~/env.mjs";
import { wait } from "~/utils/timer.js";

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
    const shouldTrigger = true;

    if (!shouldTrigger) return;

    this._triggeredAt = Date.now();

    const message = await this.requestMessageFromLLM();

    const payload: ChatMessagePayload = {
      sender: this.id,
      message,
      sentAt: Date.now(),
    };

    // TODO: remove artificial wait in favour of something more inteligent
    await wait(1500);

    this._sentMessages.push(payload.message);
    this._match.addMessage(payload);
  }

  // TODO: consider that there are multiple players sending messages in the same chat
  private async requestMessageFromLLM() {
    const { messages } = this._match;

    // TODO: Inject Character name as prefix of each message "Ash: {message}"
    const pastInputs = messages
      .slice(0, messages.length - 1)
      .filter((payload) => payload.sender !== this._id)
      .map((msg) => msg.message);

    // TODO: remove default since we'll always have at least the first prompt as message
    const latestMessage =
      messages[messages.length - 1]?.message ?? "Who are you?";

    const body = JSON.stringify({
      inputs: {
        past_user_inputs: pastInputs,
        generated_responses: this._sentMessages,
        text: latestMessage,
      },
    });

    const response = await fetch(
      // TODO: use our own API
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.HUGGING_FACE_TOKEN}`,
        },
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
      achievements: [],
    };
  }
}
