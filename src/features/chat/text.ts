export const text = {
  usernameLocal: "you - username",
  send: "SEND",
  inputFieldPlaceholder: "Type your message",
  chatEnded: "chat ended - voting time!",
  addScoreToLeaderboard:
    "Add your score to a leaderboard account and win Aleo credits",
  addScoreNow: "add score now",
  continueWith: "continue with new game",
  firstPrompt: {
    title: "25 bonus points for every vote on you as a bot",
    info: "Try and convince the other participants you are a bot",
  },

  amountBotsBusted: (botBusted: number, total: number) =>
    `${botBusted} out of ${total} bots busted!`,
  pointsWon: (val: number) =>
    `You won ${val} ${val === 1 ? "point" : "points!"}`,
};
