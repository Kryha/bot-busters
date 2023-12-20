import { type AchievementId, type Achievement } from "~/types/index.js";
import { alreadyReceivedAchievementToday } from "~/utils/achievements.js";

const lastOneAchievement: Achievement = {
  name: "Last One",
  description: "Write the last message in a match",
  calculate: ({ player, messages }) => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return false;

    const lastSender = lastMessage.sender;
    if (lastSender !== player.userId) return false;
    return true;
  },
};

const goodBustAchievement: Achievement = {
  name: "Good Bust",
  description: "Get all votes correct in a match",
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

const doubleAgentAchievement: Achievement = {
  name: "Double Agent",
  description: "Convince 2 or more humans that you are a bot in a match",
  calculate: ({ otherPlayers, player }) => {
    let isVotedAgainst = 0;
    otherPlayers.forEach((p) => {
      if (p.votes?.includes(player.userId)) isVotedAgainst += 1;
    });
    return isVotedAgainst >= 2;
  },
};

const busterStreakAchievement: Achievement = {
  name: "Buster Streak",
  description: "Bust three bots in a row",
  calculate: ({ player, playerHistory, otherPlayers, botsBusted }) => {
    if (!playerHistory || playerHistory.length < 2) return false;
    if (alreadyReceivedAchievementToday(player.userId, playerHistory, "101"))
      return false;

    // Sort playerHistory in descending order by timestamp
    const sortedPlayerHistory = playerHistory.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // Get the last two matches
    const lastTwoMatches = sortedPlayerHistory.slice(0, 2);

    //Get the player data from the last two matches
    const playerMatchData = lastTwoMatches.map((match) => {
      return match.players.find((p) => p.userId === player.userId);
    });

    // Check if all bots were busted in the last two matches
    const allBotsBustedLastTwoMatches = playerMatchData.every((p) => {
      const perfectScore = p?.achievements.filter((achievement) => {
        return achievement === "12";
      });
      return perfectScore && perfectScore.length > 0;
    });

    // Get the bots from the current match
    const agents = otherPlayers.filter((p) => p.isBot);

    const perfectCurrentGame = botsBusted === agents.length;

    return allBotsBustedLastTwoMatches && perfectCurrentGame;
  },
};

const firstTimerAchievement: Achievement = {
  name: "First-Timer",
  description: "Played your first match",
  calculate: ({ playerHistory }) => {
    if (!playerHistory || playerHistory.length === 0) return true;
    return false;
  },
};

const beginnersLuckAchievement: Achievement = {
  name: "Beginners Luck",
  description: "Player busts at least one bot in the first match",
  calculate: ({ playerHistory, botsBusted }) => {
    const isFirstMatch = !playerHistory || playerHistory.length === 0;

    return isFirstMatch && botsBusted > 0;
  },
};

export const MATCH_ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  "11": lastOneAchievement,
  "12": goodBustAchievement,
  "13": doubleAgentAchievement,
  "101": busterStreakAchievement,
  "201": firstTimerAchievement,
  "202": beginnersLuckAchievement,
};
