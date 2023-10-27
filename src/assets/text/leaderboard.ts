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

  rankNumber: (val: number) => `#${val}`,
  aleoCredits: (val: number) => `${val} Aleo credits`,
};
