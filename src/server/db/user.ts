import { dbSchema, User } from "@/server/db";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const createAnonymousUsers = async (): User => {
  const createdEmptyUsers = db
    .insert(dbSchema.users)
    .values({})
    .returning()
    .then((users) => users[0]);
  return createdEmptyUsers;
};

export const createVerifiedUser = async (
  address: string,
  username: string
): User => {
  const createdEmptyUsers = db
    .insert(dbSchema.users)
    .values({ address, username })
    .returning()
    .then((users) => users[0]);
  return createdEmptyUsers;
};

export const getUserById = async (id: string): User => {
  const user = db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.id, id))
    .then((users) => {
      //TODO: handle case when user is not found
      return users[0];
    });
  return user;
};

export const getUserByAddress = async (address: string): User => {
  const user = db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.address, address))
    .then((users) => {
      //TODO: handle case when user is not found
      if (users[0] === undefined) return {};
      return users[0];
    });
  return user;
};

export const deleteUser = async (id: string) => {
  await db.delete(dbSchema.users).where(eq(dbSchema.users.id, id)).returning();
};

export const setUsername = async (id: string, username: string) => {
  return await db
    .update(dbSchema.users)
    .set({ username })
    .where(eq(dbSchema.users.id, id))
    .returning();
};

export const updateUserScore = async (id: string, score: number) => {
  return await db
    .update(dbSchema.users)
    .set({ score })
    .where(eq(dbSchema.users.id, id))
    .returning();
};
