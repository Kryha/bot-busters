export const leaderboard = {
  useNickname: "USE NICKNAME ON LEADERBOARD",
  avatarEmoji: "🙂",
  leaderboardColumns: [
    "Ranking",
    "Player",
    "Games",
    "Score",
    "Potential Payout",
  ],
  leaderboardRank: "#5",
  allTimeLeaderboard: "All time leaderboard",
  dailyLeaderboard: "Daily leaderboard",
  countdown: (countdown: string | number) =>
    `${countdown} until today's payout`,
  addScoreToLeaderboard: "Add your score to leaderboard",

  rankNumber: (val: number) => `#${val}`,
  aleoCredits: (val: number) =>
    `${val} ${val === 1 ? " Aleo credit" : "Aleo credits"}`,
  todaysLeaderboard: (date: string) => `Today's leaderboard (${date})`,
  yesterdaysLeaderboard: (date: string) => `Yesterday's leaderboard (${date})`,
  leaderboardOf: (date: string) => `Leaderboard of ${date}`,
};
