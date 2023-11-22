export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/lobby", "/match", "/player-profile", "/username-select"],
};
