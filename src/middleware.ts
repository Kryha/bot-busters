export { default } from "next-auth/middleware";

// TODO: try using vars instead of hardcoded strings
export const config = {
  matcher: ["/lobby", "/match", "/decision", "/results"],
};
