export const achievements = {
  scoreBreakdown: "score breakdown",
  totalScore: "total",
  betterLuckNextTime: "better luck next time",
  yourScore: (correctGuesses: number) =>
    `Your score: ${correctGuesses} correct answers`,
  points: (score: number) => `+${score}`,
};
