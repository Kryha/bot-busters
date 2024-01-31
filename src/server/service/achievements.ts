import { type Achievement, type AchievementId } from "~/types/index.js";
import { type UserAchievements } from "../db/schema";

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
  calculate: ({
    player,
    playerHistory,
    otherPlayers,
    botsBusted,
    playerAchievements,
  }) => {
    const isNotEligibleForNewAchievement =
      !playerHistory ||
      !playerAchievements ||
      playerHistory.length < 2 ||
      !player ||
      alreadyReceivedAchievement(playerAchievements, "busterStreak", 1);

    if (isNotEligibleForNewAchievement) return false;

    const allBotsBustedLastTwoMatches = playerHistory
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 2)
      .map((match) => match.players.find((p) => p.userId === player.userId))
      .every((p) => p?.achievements.includes("goodBust"));

    const perfectCurrentGame =
      botsBusted === otherPlayers.filter((p) => p.isBot).length;

    return allBotsBustedLastTwoMatches && perfectCurrentGame;
  },
};

const streakCountAchievements: Achievement = {
  name: "Streak Count",
  description: "Plus one on your streak count",

  calculate: ({ playerAchievements }) => {
    if (!playerAchievements) return false;
    return !alreadyReceivedAchievement(
      playerAchievements,
      "dailyStreakCounter",
      1,
    );
  },
};

const dailyStreakAchievement: Achievement = {
  name: "Daily Streak",
  description: "Play 5 days in a row",
  calculate: ({ playerHistory, player, playerAchievements }) => {
    if (
      !playerHistory ||
      playerHistory.length < 2 ||
      !playerAchievements ||
      alreadyReceivedAchievement(playerAchievements, "fiveDayStreak", 5) ||
      !player
    )
      return false;

    //TODO: revisit this logic to check if you can also use the the achievements table
    const playedFiveTimesInARow = playerHistory
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((match) => {
        return match.players.find((p) => p.userId === player.userId);
      })
      .filter((match) => match?.achievements.includes("dailyStreakCounter"));

    return playedFiveTimesInARow.length === 5;
  },
};

const firstTimerAchievement: Achievement = {
  name: "First Timer",
  description: "Played your first match",
  calculate: ({ playerAchievements }) => {
    if (!playerAchievements) return false;
    return !alreadyReceivedAchievement(playerAchievements, "firstTimer");
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
  calculate: ({ playerAchievements }) => {
    if (!playerAchievements) return false;

    return !alreadyReceivedAchievement(playerAchievements, "realHuman");
  },
};

export const matchAchievements: Record<AchievementId, Achievement> = {
  dailyStreakCounter: streakCountAchievements,
  fiveDayStreak: dailyStreakAchievement,
  goodBust: goodBustAchievement,
  doubleAgent: doubleAgentAchievement,
  busterStreak: busterStreakAchievement,
  firstTimer: firstTimerAchievement,
  beginnersLuck: beginnersLuckAchievement,
  realHuman: realHumanAchievement,
};

export const alreadyReceivedAchievement = (
  playerAchievements: UserAchievements[],
  achievementId: AchievementId,
  days?: number,
): boolean => {
  let achievements = playerAchievements;

  if (days) {
    // Get the timestamp for 24 hours ago
    const timeStampToStart = Date.now() - days * 24 * 60 * 60 * 1000;
    // Filter playerHistory to only include matches from the past 24 hours
    achievements = playerAchievements.filter((achievement) => {
      return achievement.achievedAt.getTime() > timeStampToStart;
    });
  }
  // Check if the achievement is in the player's history
  return achievements.some(
    (achievement) => achievement.achievementId === achievementId,
  );
};
