import { type UserAchievements } from "~/server/db/schema.js";
import { type Achievement, type AchievementId } from "~/types/index.js";
import { getRelativeTimeStamp } from "~/utils/date.js";

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
      playerHistory.length < 2 ||
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
  name: "Streak Counter",
  description: "Plus one on your streak count",

  calculate: ({ playerAchievements }) => {
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
  calculate: ({ playerAchievements }) => {
    if (alreadyReceivedAchievement(playerAchievements, "fiveDayStreak", 5))
      return false;

    const dailyStreaks = playerAchievements.filter((achievement) => {
      return (
        achievement.achievementId === "dailyStreakCounter" &&
        achievement.achievedAt.getTime() > getRelativeTimeStamp(5)
      );
    }).length;

    return dailyStreaks === 5;
  },
};

const firstTimerAchievement: Achievement = {
  name: "First-Timer",
  description: "Played BotBusters for the first time",
  calculate: ({ playerAchievements }) => {
    return !alreadyReceivedAchievement(playerAchievements, "firstTimer");
  },
};

const beginnersLuckAchievement: Achievement = {
  name: "Beginners Luck",
  description: "Player busts at least one bot in the first match",
  calculate: ({ playerHistory, botsBusted }) => {
    const isFirstMatch = playerHistory.length === 0;

    return isFirstMatch && botsBusted > 0;
  },
};

const realHumanAchievement: Achievement = {
  name: "Real Human",
  description: "Play first match as a verified human",
  calculate: ({ playerAchievements }) => {
    return !alreadyReceivedAchievement(playerAchievements, "realHuman");
  },
};

const masterBusterAchievement: Achievement = {
  name: "Master Buster",
  description: "Busted (100) bots over multiple matches",
  calculate: ({ player, playerAchievements }) => {
    if (alreadyReceivedAchievement(playerAchievements, "masterBuster"))
      return false;

    return player.totalBotsBusted > 99;
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
    achievements = playerAchievements.filter((achievement) => {
      return achievement.achievedAt.getTime() > getRelativeTimeStamp(days);
    });
  }
  // Check if the achievement is in the player's achievements history
  return achievements.some(
    (achievement) => achievement.achievementId === achievementId,
  );
};
