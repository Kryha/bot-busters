export const general = {
  appTitle: "Bot Busters!",
  appDescription: "Chat, be human and bust some bots!",

  play: "Play",

  home: "Home",
  decision: "Decision",
  leaderboard: "Leaderboard",
  results: "Results",

  clickChat: "Click on the chat to open messages",
  countdown: (val: string): string => `${val} left`,
  formattedCountdown: (minutes: number, seconds: number): string =>
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`,
  username: "username",
};
