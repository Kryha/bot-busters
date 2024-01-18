// TODO: add missing links
export const howToPlay = {
  headings: {
    howToPlay: "how to play",
    pointsAndPenalties: "points and penalties",
    dailyLeaderboard: "daily leaderboard",
    playerProfiles: "player profiles",
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
      "Five players interact and chat to determine who's a bot.",
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
      "Add your score to the leaderboard by ",
    ],
  },
  pointsAndPenalties: [
    {
      regular: "Correct bot identification: ",
      highlight: "+11 points.",
    },
    {
      regular: "Correct human identification: ",
      highlight: "+10 points.",
    },
    {
      regular: "No messages sent or no selection submitted: ",
      highlight: "Results invalidated.",
    },
    {
      regular:
        "Hidden achievements grant additional points. You'll have to keep playing to find them all.",
      highlight: "",
    },
  ],
  dailyLeaderboard: [
    "Ranks are based on daily total scores.",
    "Aleo credits are awarded to top 10 players automatically when the leaderboard resets.",
    "Leaderboard resets daily at 00:00 PST.",
  ],
  playerProfiles: [
    {
      regular: "Anon players are ineligible for leaderboard/credits.",
      highlight: "",
      link: "",
    },
    {
      regular: "Profiles are created by ",
      highlight: "connecting your wallet.",
      link: "",
    },
    {
      regular:
        "KYC (Know Your Customer) process required for credit eligibility via ",
      highlight: "zPass.",
      link: "",
    },
  ],
  link: {
    connectingYourWallet: {
      text: "connecting your wallet.",
      link: "",
    },
  },
} as const;
