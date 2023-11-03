export const text = {
  username: "username",
  usernameLocal: "you - username",
  send: "SEND",
  inputFieldPlaceholder: "Type your message",
  chatEnded: "chat ended - voting time!",
  inThisChatRoom: "In this chat room you appear as",
  otherParticipants: "Other participants in this room",
  whosBotAnd: "Who’s bot and who’s not?",
  human: "human",
  bot: "bot",
  addScoreToLeaderboard:
    "Add your score to a leaderboard account and win Aleo credits",
  addScoreNow: "add score now",
  continueWith: "continue with new game",

  amountBotsBusted: (botBusted: number, total: number) =>
    `${botBusted} out of ${total} bots busted!`,
  pointsWon: (val: number) =>
    `You won ${val} ${val === 1 ? "point" : "points!"}`,
};
