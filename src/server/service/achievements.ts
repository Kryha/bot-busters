import {
  type Achievement,
  type AchievementId,
  type MatchRoom,
} from "~/types/index.js";

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
    const isNotEligibleForNewAchievement =
      !playerHistory ||
      playerHistory.length < 2 ||
      !player ||
      alreadyReceivedAchievement(player.userId, playerHistory, "101", 1);

    if (isNotEligibleForNewAchievement) return false;

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

const realHumanAchievement: Achievement = {
  name: "Real Human",
  description: "First time played as a verified human",
  calculate: ({ playerHistory, player }) => {
    if (!playerHistory || !player.isVerified) return false;
    return !alreadyReceivedAchievement(player.userId, playerHistory, "203");
  },
};

export const MATCH_ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  "11": lastOneAchievement,
  "12": goodBustAchievement,
  "13": doubleAgentAchievement,
  "101": busterStreakAchievement,
  "201": firstTimerAchievement,
  "202": beginnersLuckAchievement,
  "203": realHumanAchievement,
};

export const alreadyReceivedAchievement = (
  playerId: string,
  playerMatchHistory: MatchRoom[],
  achievementId: AchievementId,
  days?: number,
): boolean => {
  let playerHistory = playerMatchHistory;

  if (days) {
    // Get the timestamp for 24 hours ago
    const timeStampToStart = Date.now() - days * 24 * 60 * 60 * 1000;

    // Filter playerHistory to only include matches from the past 24 hours
    playerHistory = playerMatchHistory.filter(
      (match) => match.createdAt > timeStampToStart,
    );
  }
  // Check if the achievement is in the player's history
  return playerHistory.some((match) =>
    match.players.some(
      (player) =>
        player.userId === playerId &&
        player.achievements.includes(achievementId),
    ),
  );
};
