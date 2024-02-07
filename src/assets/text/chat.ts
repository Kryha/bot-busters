export const chat = {
  usernameLocal: "you - username",
  send: "SEND",
  inputFieldPlaceholder: "Start typing...",
  chatEnded: "chat ended - voting time!",
  addScoreToLeaderboard:
    "Add your score to the leaderboard. The daily top 100 gets Aleo credits!",
  addScore: "add score to leaderboard",
  playAgain: "Play again",
  firstPrompt: {
    title: "25 bonus points for every vote on you as a bot",
    info: "Try and convince the other participants you are a bot",
  },
  chatHistory: "Chat History",
  checkLeaderboard: "Check Leaderboard",
  amountBotsBusted: (botsBusted: number, totalBots: number) =>
    `${botsBusted} out of ${totalBots} bots busted!`,
  pointsWon: (val: number) =>
    `You won ${val} ${val === 1 ? "point" : "points!"}`,
};
