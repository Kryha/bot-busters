import { dbSchema, User } from "@/server/db";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const insertAnonymousUsers = async (): User => {
  return await db
    .insert(dbSchema.users)
    .values({})
    .returning()
    .then((users) => users[0]);
};

export const insertVerifiedUser = async (
  address: string,
  username: string
): Promise<User> => {
  return db
    .insert(dbSchema.users)
    .values({ address, username })
    .returning()
    .then((users) => users[0]);
};

export const selectUserById = async (
  id: string
): Promise<dbSchUser | undefined> => {
  return await db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.id, id));
};

export const selectUserByAddress = async (address: string): User => {
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

export const setUserScore = async (id: string, score: number) => {
  return await db
    .update(dbSchema.users)
    .set({ score })
    .where(eq(dbSchema.users.id, id))
    .returning();
};
