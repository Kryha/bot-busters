import { and, eq, gte } from "drizzle-orm";

import { db, dbSchema, type BBPgTransaction } from "~/server/db/index.js";
import { getRelativeTimeStamp } from "~/utils/date.js";
import { userAchievements, usersToMatches } from "./schema.js";

const { users, matches } = dbSchema;

// This is only here for testing purposes
export const deleteAllUsers = async () => {
  await db.delete(users);
};

export const deleteUser = async (
  userId: string,
  userIdToMerge?: string,
  tx?: BBPgTransaction,
) => {
  const dbTx = tx ?? db;

  if (userIdToMerge) {
    await dbTx
      .update(usersToMatches)
      .set({ userId: userIdToMerge })
      .where(eq(usersToMatches.userId, userId));
  }

  await dbTx.delete(users).where(eq(users.id, userId));
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

export const selectMatchPlayedByUser = async (
  userId: string,
  days?: number,
  tx?: BBPgTransaction,
) => {
  const dbTx = tx ?? db;
  const timestamp = days ? Date.now() - getRelativeTimeStamp(days) : 0;

  const matchesPlayed = await dbTx
    .select()
    .from(usersToMatches)
    .innerJoin(matches, eq(matches.id, usersToMatches.matchId))
    .where(
      and(
        eq(usersToMatches.userId, userId),
        gte(matches.createdAt, new Date(timestamp)),
      ),
    );
  return matchesPlayed;
};

export const selectUserAchievements = async (
  userId: string,
  tx?: BBPgTransaction,
) => {
  const dbTx = tx ?? db;

  const achievements = await dbTx
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));
  return achievements;
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

export const selectUserById = async (userId: string) => {
  const selectedUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  return selectedUser.at(0);
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
