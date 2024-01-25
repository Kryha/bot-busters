// TODO: check which to delete
export const playerProfile = {
  profile: "Profile",
  createProfile: "Create a profile and add your score to the leaderboard.",
  top10ReceiveCredits: "The daily top 10 receives Aleo credits!",
  connectWallet: "Connect Wallet",
  profileColumns: ["Date", "Ranking", "Games", "Score", "Payout"],
  new: "New!",

  potentialCredits: (credits?: number) =>
    credits ? `${credits} Aleo credits (potentially)` : "-",
  credits: (credits?: number) => (credits ? `${credits} Aleo credits` : "-"),
  noCredits: "-",
};
