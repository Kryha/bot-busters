// TODO: update error copywrite based on design updates
export const errorMessage = {
    500: "The server returned an error :(",
    404: "404:Page not found",
    generalHeading: "An error occurred :(",
    tryRefreshing: "Try refreshing the page",
    tryAgain: "Try Again",
    match: {
        matchMaking: "An error occurred while loading the match",
        votingDisabled: "You are not allowed to vote",
        lostConnection: "Lost connection",
        playerLeftChat: (player: string)=>`${player} left the chat`,
        selectBotError: "Selection confirmation failed",
        scoreCalculation: "Score calculation failed",
    },
    usernameTaken: "Username taken",
    walletConnection: "Wallet connection failed",
    leaderBoard: "Leaderboard unable to load",
    support: "Message failed to send",
}