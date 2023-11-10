export const landing = {
  connectLeoWallet: "Connect leo wallet",
  toPlayWith: "to play with existing player account",
  appName: "BotBuster Game",
  descriptionPart1:
    "Can you separate bots from humans? Chat with both and proof yourself!",
  descriptionPart2:
    "The daily top 100 gets Aleo credits transferred to their wallets. Start playing now!",
  startNewGame: "Start new game",
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
