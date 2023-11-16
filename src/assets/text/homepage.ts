export const homepage = {
  appName: "BotBuster Game",
  startNewGame: "Start new game",
  openDaily: "open Daily leaderboard",
  descriptionPart1:
    "Can you separate bots from humans? Chat with both and proof yourself!",
  descriptionPart2:
    "The daily top 100 gets Aleo credits transferred to their wallets. Start playing now!",
  topRanked: (position: number, username: string, score: number) =>
    `${position + 1}. ${username} ${score} points`,
};
