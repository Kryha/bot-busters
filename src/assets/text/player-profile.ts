export const playerProfile = {
  yourPlayerProfile: "Your player profile",
  createProfile:
    "Create a profile and add your score to the leaderboard. The daily top 100 receives Aleo credits!",
  addScoreToLeaderboard: "add score to leaderboard",
  profileColumns: ["Date", "Ranking", "Games", "Score", "Payout"],
  new: "New!",

  hiPlayer: (username: string) => `Hi, ${username}`,
  potentialCredits: (credits?: number) =>
    credits ? `${credits} Aleo credits (potentially)` : "-",
  credits: (credits?: number) => (credits ? `${credits} Aleo credits` : "-"),
  noCredits: "-",
};
