import { v4 as uuid } from "uuid";

import { matchEvent, ee } from "~/server/api/match-maker.js";
import type {
  CharacterId,
  ChatMessagePayload,
  MatchRoom,
  PlayerType,
} from "~/types/index.js";
import { wait } from "~/utils/timer.js";

const requestMessageFromLLM = async (
  _agentId: string,
  _messageHistory: ChatMessagePayload[]
) => {
  // TODO: make actual call to LLM process
  const message = await Promise.resolve("Definitely not a bot...");
  return message;
};

export const computeAgentMessages = async (room: MatchRoom) => {
  const agents = room.players.filter((player) => player.isBot);

  try {
    for (const agent of agents) {
      // TODO: improve logic, delete hardcoded wait and use Promise.all()
      const message = await requestMessageFromLLM(agent.userId, room.messages);

      await wait(2000);

      const payload: ChatMessagePayload = {
        sender: agent.userId,
        message,
        sentAt: Date.now(),
      };

      room.messages.unshift(payload);
      ee.emit(matchEvent(room.id), payload);
    }
  } catch (error) {
    console.error("Error computing LLM messages:", error);
  }
};

export const generateAgent = (
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

  return agent;
};
