import { type MatchRoom } from "../types/match.js";

export const alreadyReceivedAchievementToday = (
  playerId: string,
  playerMatchHistory: MatchRoom[],
  achievementId: string
): boolean => {
  // Get the timestamp for 24 hours ago
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  // Filter playerHistory to only include matches from the past 24 hours
  const matchesPastDayHours = playerMatchHistory.filter(
    (match) => match.createdAt > twentyFourHoursAgo
  );

  // Get the player data from the last two matches
  const playerMatchData = matchesPastDayHours.map((match) => {
    return match.players.find((p) => p.userId === playerId);
  });

  // Check if the achievement with id 101 is in the player's achievements
  const achievementReceived = playerMatchData.some((p) => {
    return p?.achievements.some((achievement) => {
      return achievement.id === achievementId;
    });
  });

  return achievementReceived;
};
