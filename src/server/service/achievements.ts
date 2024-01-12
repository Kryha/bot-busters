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
    const wrongVotes = player.votes?.some(
      (vote) => !agents.some((a) => a.userId === vote),
    );

    return botsBusted === agents.length && !wrongVotes;
  },
};

const doubleAgentAchievement: Achievement = {
  name: "Double Agent",
  description: "Convince 2 or more humans that you are a bot in a match",
  calculate: ({ otherPlayers, player }) => {
    const isVotedAgainst = otherPlayers.filter(
      (p) => p.votes?.includes(player.userId),
    ).length;
    return isVotedAgainst >= 2;
  },
};

const busterStreakAchievement: Achievement = {
  name: "Buster Streak",
  description: "Bust three bots in a row",
  calculate: ({ player, playerHistory, otherPlayers, botsBusted }) => {
    if (
      !playerHistory ||
      playerHistory.length < 2 ||
      alreadyReceivedAchievementToday(player.userId, playerHistory, "101")
    )
      return false;

    const allBotsBustedLastTwoMatches = playerHistory
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 2)
      .map((match) => match.players.find((p) => p.userId === player.userId))
      .every((p) => p?.achievements.includes("12"));

    const perfectCurrentGame =
      botsBusted === otherPlayers.filter((p) => p.isBot).length;

    return allBotsBustedLastTwoMatches && perfectCurrentGame;
  },
};

const firstTimerAchievement: Achievement = {
  name: "First Timer",
  description: "Played your first match",
  calculate: ({ playerHistory }) => {
    return !playerHistory || playerHistory.length === 0;
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
