import { v4 as uuid } from "uuid";

import { matchEvent, ee } from "~/server/api/match-maker.js";
import type {
  CharacterId,
  ChatMessagePayload,
  PlayerType,
} from "~/server/api/match-types.js";

export const generateAgent = (
  roomId: string,
  availableCharacterIds: CharacterId[]
): PlayerType => {
  const characterId = availableCharacterIds.pop();

  if (!characterId) throw new Error("Out of characters");

  const agent = {
    userId: uuid(),
    characterId,
    score: 0,
    isBot: true,
    isScoreSaved: false,
    botsBusted: 0,
    correctGuesses: 0,
    votes: [],
  };

  ee.on(matchEvent(roomId), (stream: ChatMessagePayload) => {
    // This will be be a controller that listents to events and emmits the right action
    if (stream?.sender !== agent.userId) {
      const cb = async () => {
        // TODO: make async call to LLM Container
        try {
          const message = await Promise.resolve("Definetely not a bot...");
          ee.emit(matchEvent(roomId), {
            sender: agent.userId,
            message,
            sentAt: Date.now(),
          });
        } catch (error) {
          console.error(error);
        }
      };
      setTimeout(() => void cb(), 2000);
    }
  });

  return agent;
};
