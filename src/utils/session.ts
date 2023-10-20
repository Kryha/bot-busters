import { type Session } from "next-auth";

export const isValidSession = (session: Session | null) =>
  Boolean(session?.uuid && session?.uuid !== "null");
