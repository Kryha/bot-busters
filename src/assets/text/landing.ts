export const landing = {
  connectLeoWallet: "Connect leo wallet",
  toPlayWith: "to play with existing player account",
  todaysLeaderboard: "Today's leaderboard",
  allTimeLeaderboard: "All time leaderboard",
  everydayTheLeaderboard:
    "Every day the leaderboard top 100 will get Aleo credits payed out!",
  yourScoreToday: "your score today",
  yourPosition: "your position",
  signOut: "sign out (disconnect wallet)",
  edit: "edit",
  addScoreToLeaderboard: "Add your score to leaderboard",
  todaysScore: "Today's score",
  todaysPosition: "Today's position",
  allTimeScore: "All time score",
  allTimePosition: "All time position",
  youWonCredits:
    "You've won Aleo credits based on your leaderboard position yesterday. Check your wallet!",
  aleoCreditsPayout: "Aleo credits payouts",
  newCredits: "new",
  dailyScore: "Daily score",

  countdown: (countdown: string | number) =>
    `${countdown} until today's payout`,
  points: (val: number) => `${val} ${val === 1 ? "point" : "points"}`,
  numberPosition: (val: number) => `#${val}`,
  dateAndCredits: (date: string, credits: number) =>
    `${date} - ${credits} Aleo credits`,
};
