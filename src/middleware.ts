export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/lobby", "/chat", "/decision", "/leaderboard", "/results"],
};
