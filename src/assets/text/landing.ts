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

  countdown: (countdown: string | number) =>
    `${countdown} until today's payout`,
  points: (val: number) => `${val} points`,
  numberPosition: (val: number) => `#${val}`,
};
