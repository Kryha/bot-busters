import { type Session } from "next-auth";

export const isValidSession = (session: Session | null) =>
  Boolean(session?.id && session?.id !== "null");

export const isAnonymousSession = (session: Session | null) => {
  const validSession = isValidSession(session);
  if (validSession && !session?.address && !session?.username) return true;
};

export const isVerifiedSession = (session: Session | null) => {
  if (!isValidSession(session)) return false;
  if (session?.address && session?.username) return true;
};
