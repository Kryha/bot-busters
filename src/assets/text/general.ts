export const general = {
  appTitle: "Bot Busters!",
  appDescription: "Chat, be human and bust some bots!",
  menu: "menu",
  play: "Play",
  close: "close",
  home: "Home",
  signOut: "sign out (disconnect wallet)",
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
  dailyScore: "Daily score",
  aleoCreditsPayout: "Aleo credits payouts",
  clickChat: "Click on the chat to open messages",
  username: "username",
  newCredits: "new",
  todaysPosition: "Today's position",
  allTimeScore: "All time score",
  allTimePosition: "All time position",
  todaysScore: "Today's score",
  youWonCredits:
    "You've won Aleo credits based on your leaderboard position yesterday. Check your wallet!",
  bot: "bot",
  confirm: "Confirm",
  aleoWebsite: "https://aleo.org/",

  countdown: (val: string): string => `${val} left`,
  formattedCountdown: (minutes: number, seconds: number): string =>
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`,
  points: (val: number) => `${val} ${val === 1 ? "point" : "points"}`,
  dateAndCredits: (date: string, credits: number) =>
    `${date} - ${credits} Aleo credits`,
  numberPosition: (val: number) => `#${val}`,
};
