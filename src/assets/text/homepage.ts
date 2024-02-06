export const homepage = {
  appName: "BotBuster Game",
  startNewGame: "Start new game",
  continueGame: "Continue game",
  openDaily: "Daily leaderboard",
  descriptionPart1: "Who's a bot?, Who's a human?",
  descriptionPart2:
    "The daily top 100 gets Aleo credits transferred to their wallets. Start playing now!",
  topRankedTitle: "Daily top 10 earn Aleo Credits",
  topRanked: (position: number, username: string, score: number) =>
    ` / ${position + 1}. ${username} ${score}`,
  points: "pts",
  about: "About",
};
