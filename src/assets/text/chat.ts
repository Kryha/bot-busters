export const chat = {
  usernameLocal: "you - username",
  send: "SEND",
  inputFieldPlaceholder: "Type your message",
  chatEnded: "chat ended - voting time!",
  addScoreToLeaderboard:
    "Add your score to the leaderboard. The daily top 100 gets Aleo credits!",
  addScore: "add score to leaderboard",
  playNewGame: "Play new game",
  firstPrompt: {
    title: "25 bonus points for every vote on you as a bot",
    info: "Try and convince the other participants you are a bot",
  },
  chatHistory: "Chat History",

  amountBotsBusted: (botsBusted: number, totalBots: number) =>
    `${botsBusted} out of ${totalBots} bots busted!`,
  pointsWon: (val: number) =>
    `You won ${val} ${val === 1 ? "point" : "points!"}`,
};
