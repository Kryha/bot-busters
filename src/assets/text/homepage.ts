export const homepage = {
  appName: "BotBuster Game",
  startNewGame: "Start new game",
  continueGame: "Continue game",
  leaderboard: "Leaderboard",
  descriptionPart1: "Who's a bot?, Who's a human?",
  topRankedTitle: "Top 10",
  aleoSystems: () => {
    return `© 2023 Aleo Systems, Inc.`;
  },
  topRanked: (position: number, username: string, score: number) =>
    ` / ${position}. ${username} ${score}`,
  points: "pts",
  about: "About",
};
