import { type UserAchievements } from "~/server/db/schema.js";
import { type Achievement, type AchievementId } from "~/types/index.js";

const goodBustAchievement: Achievement = {
  name: "Good Bust",
  description: "Bust all bots in 1 match (no humans)",
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
  description: "Convince >1 human(s) that you are a bot in a match",
  calculate: ({ otherPlayers, player }) => {
    const isVotedAgainst = otherPlayers.filter(
      (p) => p.votes?.includes(player.userId),
    ).length;
    return isVotedAgainst >= 2;
  },
};

const busterStreakAchievement: Achievement = {
  name: "Buster Streak",
  description: "Successfully bust all bots in (3) consecutive games",
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
  calculate: ({ player, playerAchievements }) => {
    if (
      !playerAchievements ||
      alreadyReceivedAchievement(playerAchievements, "fiveDayStreak", 5) ||
      !player
    )
      return false;

    const dailyStreaks = playerAchievements.filter((achievement) => {
      return (
        achievement.achievementId === "dailyStreakCounter" &&
        achievement.achievedAt.getTime() > Date.now() - 5 * 24 * 60 * 60 * 1000
      );
    }).length;

    return dailyStreaks === 5;
  },
};

const firstTimerAchievement: Achievement = {
  name: "First-Timer",
  description: "Played BotBusters for the first time",
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
  description: "Play first match as a verified human",
  calculate: ({ playerAchievements }) => {
    if (!playerAchievements) return false;
    return !alreadyReceivedAchievement(playerAchievements, "realHuman");
  },
};

const masterBusterAchievement: Achievement = {
  name: "Master Buster",
  description: "Busted (100) bots over multiple matches",
  calculate: ({ player, playerAchievements }) => {
    if (
      !playerAchievements ||
      alreadyReceivedAchievement(playerAchievements, "masterBuster")
    )
      return false;
    return player.totalBotsBusted === 100;
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
  masterBuster: masterBusterAchievement,
};

export const alreadyReceivedAchievement = (
  playerAchievements: UserAchievements[],
  achievementId: AchievementId,
  days?: number,
): boolean => {
  let achievements = playerAchievements;

  if (days) {
    // Get the timestamp for x amount of days ago
    const timeStampToStart = Date.now() - days * 24 * 60 * 60 * 1000;
    // Filter achievements to only include matches from the past 24 hours
    achievements = playerAchievements.filter((achievement) => {
      return achievement.achievedAt.getTime() > timeStampToStart;
    });
  }
  // Check if the achievement is in the player's achievements history
  return achievements.some(
    (achievement) => achievement.achievementId === achievementId,
  );
};
