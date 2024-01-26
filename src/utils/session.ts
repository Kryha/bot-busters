import { type Session } from "next-auth";

export const isValidSession = (session: Session | null) =>
  Boolean(session?.user.id && session?.user.id !== "null");
