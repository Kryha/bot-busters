import { type Session } from "next-auth";

export const isValidSession = (session: Session | null) =>
  Boolean(session?.id && session?.id !== "null");

export const isAnonymousSession = (session: Session | null) => {
  const validSession = isValidSession(session);
  return Boolean(validSession && !session?.address && !session?.username);
};

export const isUnverifiedSession = (session: Session | null) => {
  const validSession = isValidSession(session);
  return Boolean(validSession && session?.address && !session?.username);
};

export const isVerifiedSession = (session: Session | null) => {
  const validSession = isValidSession(session);
  return Boolean(validSession && session?.address && session?.username);
};
