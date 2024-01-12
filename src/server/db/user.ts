import { eq, sql } from "drizzle-orm";

import { db, dbSchema } from "~/server/db/index.js";

const { users, matches } = dbSchema;

// This is only here for testing purposes
export const deleteAllUsers = async () => {
  await db.delete(users);
};

export const insertAnonymousUser = async () => {
  const newUsers = await db.insert(users).values({}).returning();
  const newUser = newUsers.at(0);

  if (!newUser) throw new Error("User creation failed");
  return newUser;
};

export const insertUserWithAddress = async (address: string) => {
  const newUsers = await db.insert(users).values({ address }).returning();
  const newUser = newUsers.at(0);

  if (!newUser) throw new Error("User creation failed");
  return newUser;
};

export const selectMatchPlayedByUser = async (userId: string) => {
  const selectedUsers = await db
    .select()
    .from(matches)
    .where(
      sql`${matches.id} IN (SELECT unnest(${users.matchesPlayed}) AS id FROM ${users} WHERE id = ${userId})`,
    );
  return selectedUsers;
};

export const insertVerifiedUser = async (address: string, username: string) => {
  const newVerifiedUser = await db
    .insert(users)
    .values({ address, username })
    .returning();

  return newVerifiedUser.at(0);
};

export const selectUserByAddress = async (address: string) => {
  const selectedUsers = await db
    .select()
    .from(users)
    .where(eq(users.address, address));
  return selectedUsers.at(0);
};

export const setUserScore = async (id: string, score: number) => {
  const updatedUsers = await db
    .update(users)
    .set({ score })
    .where(eq(users.id, id))
    .returning();
  if (!updatedUsers.at(0)) {
    throw new Error("Failed to update user score");
  }
  return updatedUsers.at(0);
};
