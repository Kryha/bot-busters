import { type ChatMessagePayload, type PlayerType } from "~/types/index.js";
import { Agent } from "./agent";

interface MatchAchievement {
  id: string;
  name: string;
  description: string;
  calculate: (matchData: MatchData) => number;
}

// TODO: add player stats
interface MatchData {
  player: PlayerType;
  messages: ChatMessagePayload[];
  botsBusted: number;
  agents: Agent[];
}

const lastMessageAchievement: MatchAchievement = {
  id: "11",
  name: "Last message",
  description: "Write the last message in a match",
  calculate: ({ player, messages }) => {
    const lastMessage = messages[messages.length - 1];
    console.log("lastMessage", lastMessage);
    if (!lastMessage) return 0;

    const lastSender = lastMessage.sender;
    if (lastSender !== player.userId) return 0;
    return 13;
  },
};

const perfectScoreAchievement: MatchAchievement = {
  id: "12",
  name: "Perfect score",
  description: "Get all votes correct in a match",
  calculate: ({ botsBusted, agents }) => {
    if (botsBusted !== agents.length) return 0;
    return 13;
  },
};

const someoneSelectedYouAsABotAchievement: MatchAchievement = {
  id: "13",
  name: "Someone selected you as a bot",
  description: "Someone selected you as a bot",
  calculate: ({ player }) => {
    if (!player.isBot) return 0;
    return 13;
  },
};

export const MATCH_ACHIEVEMENTS: Record<string, MatchAchievement> = {
  // Match achievement - written last message
  "11": lastMessageAchievement,
  // Match achievement - perfect score (all votes correct)
  "12": perfectScoreAchievement,
  // Match achievement - someone selected you as a bot
  "13": someoneSelectedYouAsABotAchievement,
  // Day achievement - say a specific word
  // "101": 5,
  // Day achievement - successfully bust all bots 3 consecutive games
  // "102": 10,
  // Day achievement - Daily streak plays bot busters X days in a row
  // "103": 10,
  // One time achievement - player wins his first game
  // "201": 10,
};
