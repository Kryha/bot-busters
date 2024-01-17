export const howToPlay = {
  headings: {
    howToPlay: "HOW TO PLAY",
    pointsAndPenalties: "POINTS AND PENALTIES",
    dailyLeaderboard: "DAILY LEADERBOARD",
    playerProfiles: "PLAYER PROFILES",
  },
  main: [
    "BotBusters is a multiplayer chatroom game where you interact with a mix of humans and bots and do your best to discern who the bots are.",
    "Each round of BotBusters plays out in four phases",
  ],
  numberedSection: {
    matchmaking: [
      "Players enter a lobby.",
      "The lobby randomly mixes humans and bots, with a minimum of one other human and at least one bot per match.",
      "Waiting time varies to prevent players from guessing the mix of humans and bots.",
      "Players are randomly assigned one of five characters for easy identification in the chatroom.",
    ],
    chatting: [
      "Five players interact and chat to determine who’s a bot.",
      "Time limit: Three minutes.",
      "Prompts are provided to stimulate conversation.",
      "Profanity and harassment are prohibited.",
    ],
    busting: [
      "Time to call out who in the room is a bot.",
      "Players can review the full chat history.",
      "Time limit for selection: one minute.",
      "If you fail to vote before the time limit, you get no points.",
    ],
    results: [
      "Points are awarded for correct guesses.",
      "Hidden achievements offer additional points.",
      "Add your score to the leaderboard by",
    ],
  },
  pointsAndPenalties: [
    "Correct bot identification: +11 points.",
    "Correct human identification: +10 points.",
    "Incorrect selection: 0 points.",
    "No messages sent or no selection submitted: Results invalidated.",
    "Hidden achievements grant additional points. You'll have to keep playing to find them all.",
  ],
  dailyLeaderboard: [
    "Ranks are based on daily total scores.",
    "Aleo credits are awarded to top 10 players automatically when the leaderboard resets.",
    "Leaderboard resets daily at 00:00 PST.",
  ],
  playerProfiles: [
    "Anon players are ineligible for leaderboard/credits.",
    {
      text: "Profiles are created by ",
      linkText: "connecting your wallet.",
      // TODO: add link
      linkUrl: "",
    },
    {
      text: "KYC (Know Your Customer) process required for credit eligibility via ",
      linkText: "zPass.",
      // TODO: add link
      linkUrl: "",
    },
  ],
  link: {
    connectingYourWallet: {
        text: "connecting your wallet.",
        link: ""
    }
  }
} as const;
