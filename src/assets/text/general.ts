export const general = {
  appTitle: "Bot Busters!",
  appDescription: "Chat, be human and bust some bots!",
  menu: "menu",
  play: "Play",
  close: "close",

  home: "Home",
  decision: "Decision",
  leaderboard: "Leaderboard",
  results: "Results",
  startNewGame: "Start new game",
  playerProfile: "Player profile",
  dailyLeaderboard: "Daily leaderboard",
  howToPlay: "How to play",
  connectWallet: "Connect wallet",
  aleoSystems: "© Aleo Systems, Inc",
  privacy: "Privacy",
  cookies: "Cookies",
  support: "Support",
  discord: "Discord",
  aleoOrg: "Aleo.org",
  zPass: "zPass",

  clickChat: "Click on the chat to open messages",
  countdown: (val: string): string => `${val} left`,
  formattedCountdown: (minutes: number, seconds: number): string =>
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`,
  username: "username",
};
