import { alreadyReceivedAchievementToday } from "~/utils/achievements.js";
import {
  type MatchRoom,
  type ChatMessagePayload,
  type PlayerType,
} from "~/types/index.js";

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
  otherPlayers: PlayerType[];
  playerHistory?: MatchRoom[];
}

const lastMessageAchievement: MatchAchievement = {
  id: "11",
  name: "Last message",
  description: "Write the last message in a match",
  calculate: ({ player, messages }) => {
    const lastMessage = messages[messages.length - 1];
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
  calculate: ({ botsBusted, otherPlayers }) => {
    const agents = otherPlayers.filter((p) => p.isBot);

    if (botsBusted !== agents.length) return 0;

    return 13;
  },
};

const someoneSelectedYouAsABotAchievement: MatchAchievement = {
  id: "13",
  name: "Someone selected you as a bot",
  description: "Someone selected you as a bot",
  calculate: ({ otherPlayers, player }) => {
    let isVotedAgainst = 0;
    otherPlayers.forEach((p) => {
      if (p.votes?.includes(player.userId)) isVotedAgainst = 13;
    });
    return isVotedAgainst;
  },
};

const bustThreeBotsInARowAchievement: MatchAchievement = {
  id: "101",
  name: "Bust three bots in a row",
  description: "Bust three bots in a row",
  calculate: ({ player, playerHistory, otherPlayers, botsBusted }) => {
    if (!playerHistory || playerHistory.length < 2) return 0;
    if (alreadyReceivedAchievementToday(player.userId, playerHistory, "101"))
      return 0;

    // Sort playerHistory in descending order by timestamp
    const sortedPlayerHistory = playerHistory.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // Get the last two matches
    const lastTwoMatches = sortedPlayerHistory.slice(0, 2);
    console.log("Last two played matches", lastTwoMatches);

    //Get the player data from the last two matches
    const playerMatchData = lastTwoMatches.map((match) => {
      return match.players.find((p) => p.userId === player.userId);
    });
    console.log("Player data", playerMatchData);

    // Check if all bots were busted in the last two matches
    const allBotsBustedLastTwoMatches = playerMatchData.every((p) => {
      console.log("Player Achievements", p?.achievements);

      const perfectScore = p?.achievements.filter((achievement) => {
        return achievement.id === "12";
      });
      console.log("Perfect Score", perfectScore);
      return perfectScore && perfectScore.length > 0;
    });

    console.log(
      "All bots busted last two matches",
      allBotsBustedLastTwoMatches
    );

    // Get the bots from the current match
    const agents = otherPlayers.filter((p) => p.isBot);

    const perfectCurrentGame = botsBusted === agents.length;

    if (allBotsBustedLastTwoMatches && perfectCurrentGame) return 13;

    return 0;
  },
};

const playerFirstMatchAchievement: MatchAchievement = {
  id: "201",
  name: "First match",
  description: "Played your first match",
  calculate: ({ playerHistory }) => {
    if (!playerHistory || playerHistory.length === 0) return 13;
    return 0;
  },
};

export const MATCH_ACHIEVEMENTS: Record<string, MatchAchievement> = {
  // Match achievement - written last message
  "11": lastMessageAchievement,
  // Match achievement - perfect score (all votes correct)
  "12": perfectScoreAchievement,
  // Match achievement - someone selected you as a bot
  "13": someoneSelectedYouAsABotAchievement,
  // Day achievement - successfully bust all bots 3 consecutive games
  "101": bustThreeBotsInARowAchievement,
  // Day achievement - Daily streak plays bot busters X days in a row
  // "102": 10,
  // One time achievement - player plays his first game
  "201": playerFirstMatchAchievement,
  // One time achievement - player wins his first game
  //"202": playerWinsFirstMatchAchievement,
};
