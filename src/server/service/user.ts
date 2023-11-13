import { eq } from "drizzle-orm";
import { db, dbSchema } from "../db/";

const { users } = dbSchema;

// This is only here for testing purposes
export const deleteAllUsers = async () => {
  await db.delete(users);
};

export const insertAnonymousUsers = async () => {
  const newUser = await db.insert(users).values({}).returning();

  return newUser.at(0);
};

export const insertUserWithAddress = async (address: string) => {
  const newUser = await db.insert(users).values({ address }).returning();

  return newUser.at(0);
};

export const insertVerifiedUser = async (address: string, username: string) => {
  const newVerifiedUser = await db
    .insert(users)
    .values({ address, username })
    .returning();

  return newVerifiedUser.at(0);
};

export const selectUserById = async (id: string) => {
  const selectedUsers = await db.select().from(users).where(eq(users.id, id));
  return selectedUsers.at(0);
};

export const selectUserByAddress = async (address: string) => {
  const selectedUsers = await db
    .select()
    .from(users)
    .where(eq(users.address, address));
  return selectedUsers.at(0);
};

export const deleteUser = async (id: string) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deletedUser.at(0);
};

export const setUsername = async (id: string, username: string) => {
  const updatedUsers = await db
    .update(users)
    .set({ username })
    .where(eq(users.id, id))
    .returning();

  return updatedUsers.at(0);
};

export const setUserScore = async (id: string, score: number) => {
  try {
    const updatedUsers = await db
      .update(users)
      .set({ score })
      .where(eq(users.id, id))
      .returning();

    return updatedUsers.at(0);
  } catch (e) {
    throw new Error("Unable to set the score,");
  }
};

export const mergeUserScore = async (sessionId: string, existingId: string) => {
  const sessionUser = await selectUserById(sessionId);
  const existingUser = await selectUserById(existingId);

  if (!sessionUser || !existingUser) {
    throw new Error("Invalid user id");
  }

  const updatedUsers = await db
    .update(users)
    .set({ score: sessionUser.score + existingUser.score })
    .where(eq(users.id, existingId))
    .returning();

  if (!updatedUsers[0]) {
    throw new Error("Invalid user id");
  }
  await deleteUser(sessionId);

  return updatedUsers.at(0);
};
