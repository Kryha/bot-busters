import { type AchievementId, type MatchRoom } from "../types/match.js";

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
  // Check if the achievement is in the player's achievements in the past 24 hours
  return playerHistory.some((match) =>
    match.players.some(
      (player) =>
        player.userId === playerId &&
        player.achievements.includes(achievementId),
    ),
  );
};
