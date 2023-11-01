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

  rankNumber: (val: number) => `#${val}`,
  aleoCredits: (val: number) =>
    `${val} ${val === 1 ? " Aleo credit" : "Aleo credits"}`,
};
