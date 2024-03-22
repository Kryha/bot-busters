// TODO: update error copywrite based on design updates
export const errorMessage = {
  500: "The server returned an error :(",
  404: "404: Page not found",
  pageDoesNotExist: "Hmmmm... Looks like this page doesn't exist",
  unauthenticated:
    "Stop right there! This page is only for authenticated humans.",
  generalHeading: "Error",
  tryRefreshing: "Try refreshing the page",
  tryAgain: "Try Again",
  goHome: "Return to Home",
  goBack: "Go Back",
  match: {
    general: "An error occurred while loading the match",
    votingDisabled: "You are not allowed to vote",
    lostConnection: "Lost connection",
    playerLeftChat: (player: string) => `${player} left the chat`,
    selectBotError: "Selection confirmation failed",
    scoreCalculation: "Score calculation failed",
    voting: "An error occurred while voting",
  },
  account: {
    general: "An error ocurred while loading the account",
    usernameTaken: "Username taken",
    shouldNotMerge: "Account cannot be created at this time",
    setUsername: "An error occurred while setting the username",
  },
  walletConnection: "Wallet connection failed",
  leaderBoard: "Leaderboard unable to load",
  support: "Message failed to send",
};
