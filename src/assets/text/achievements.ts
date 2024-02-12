export const achievements = {
  scoreBreakdown: "score breakdown",
  totalScore: "total",
  betterLuckNextTime: "better luck next time",

  yourScore: (correctGuesses: number) =>
    `Your score: ${correctGuesses} correct answers`,
  points: (score: number) => `+${score}`,
  botsBusted: (amount: number) =>
    `${amount} ${amount === 1 ? "Bot" : "Bots"} Busted`,
  humansIdentified: (amount: number) =>
    `${amount} ${amount === 1 ? "Human" : "Humans"} Identified`,
  humansFooled: (amount: number) =>
    `${amount} ${amount === 1 ? "Human" : "Humans"} Fooled`,
};
