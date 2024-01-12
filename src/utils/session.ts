import { type Session } from "next-auth";

export const isValidSession = (session: Session | null) =>
  Boolean(session?.user.id && session?.user.id !== "null");

export const isAnonymousSession = (session: Session | null) => {
  const validSession = isValidSession(session);
  return Boolean(
    validSession && !session?.user.address && !session?.user.username,
  );
};

export const missingUsername = (session: Session | null) => {
  const validSession = isValidSession(session);
  return Boolean(
    validSession && session?.user.address && !session?.user.username,
  );
};

export const isVerifiedSession = (session: Session | null) => {
  const validSession = isValidSession(session);
  return Boolean(
    validSession && session?.user.address && session?.user.username,
  );
};
