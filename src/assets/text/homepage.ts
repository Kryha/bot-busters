export const homepage = {
  appName: "BotBuster Game",
  startNewGame: "Start new game",
  continueGame: "Continue game",
  openDaily: "Leaderboard",
  descriptionPart1: "Who's a bot?, Who's a human?",
  topRankedTitle: "Top 10",
  topRanked: (position: number, username: string, score: number) =>
    ` / ${position + 1}. ${username} ${score}`,
  points: "pts",
  about: "About",
};
