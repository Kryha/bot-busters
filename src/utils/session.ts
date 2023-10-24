import { type Session } from "next-auth";

export const isValidSession = (session: Session | null) =>
  Boolean(session?.address && session?.address !== "null");
