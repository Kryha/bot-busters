import { type AchievementId, type MatchRoom } from "../types/match.js";

export const alreadyReceivedAchievement = (
  playerId: string,
  playerMatchHistory: MatchRoom[],
  achievementId: AchievementId,
): boolean => {
  // Check if the achievement is in the player's achievements at any time
  return playerMatchHistory.some((match) =>
    match.players.some(
      (player) =>
        player.userId === playerId &&
        player.achievements.includes(achievementId),
    ),
  );
};

export const alreadyReceivedAchievementToday = (
  playerId: string,
  playerMatchHistory: MatchRoom[],
  achievementId: AchievementId,
): boolean => {
  // Get the timestamp for 24 hours ago
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  // Filter playerHistory to only include matches from the past 24 hours
  const matchesPastDayHours = playerMatchHistory.filter(
    (match) => match.createdAt > twentyFourHoursAgo,
  );

  // Check if the achievement is in the player's achievements in the past 24 hours
  return matchesPastDayHours.some((match) =>
    match.players.some(
      (player) =>
        player.userId === playerId &&
        player.achievements.includes(achievementId),
    ),
  );
};
