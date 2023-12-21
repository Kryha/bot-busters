import { type ChatMessagePayload, type PlayerType } from "~/types/index.js";

interface MatchAchievement {
  id: string;
  name: string;
  description: string;
  points: number;
  calculate: (matchData: MatchData) => boolean;
}

// TODO: add player stats
interface MatchData {
  player: PlayerType;
  messages: ChatMessagePayload[];
  botsBusted: number;
  otherPlayers: PlayerType[];
}

const lastMessageAchievement: MatchAchievement = {
  id: "11",
  name: "Last message",
  description: "Write the last message in a match",
  points: 13,
  calculate: ({ player, messages }) => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return false;

    const lastSender = lastMessage.sender;
    if (lastSender !== player.userId) return false;
    return true;
  },
};

const perfectScoreAchievement: MatchAchievement = {
  id: "12",
  name: "Perfect score",
  description: "Get all votes correct in a match",
  points: 13,
  calculate: ({ player, botsBusted, otherPlayers }) => {
    const agents = otherPlayers.filter((p) => p.isBot);

    const wrongVotes = player.votes?.filter((vote) => {
      const isCorrectGuess = agents.find((a) => a.userId === vote);
      return !isCorrectGuess;
    });

    if (botsBusted !== agents.length) return false;
    if (wrongVotes?.length) return false;

    return true;
  },
};

const someoneSelectedYouAsABotAchievement: MatchAchievement = {
  id: "13",
  name: "Someone selected you as a bot",
  description: "Someone selected you as a bot",
  points: 13,
  calculate: ({ otherPlayers, player }) => {
    let isVotedAgainst = false;
    otherPlayers.forEach((p) => {
      if (p.votes?.includes(player.userId)) isVotedAgainst = true;
    });
    return isVotedAgainst;
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
