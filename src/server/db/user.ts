import { dbSchema, User } from "@/server/db";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const createAnonymousUsers = (): User => {
  const createdEmptyUsers = db
    .insert(dbSchema.users)
    .values({})
    .returning()
    .then((users) => users[0]);
  return createdEmptyUsers;
};

export const createAuthenticatedUser = (
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

export const getUserById = (id: string): User => {
  const user = db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.id, id))
    .then((users) => {
      //TODO: handle case when user is not found
      if (users[0] === undefined) return {};
      return users[0];
    });
  if (!user) throw new Error(`User with id ${id} not found`);
  return user;
};

export const getUserByAddress = (address: string): User => {
  const user = db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.address, address))
    .then((users) => {
      //TODO: handle case when user is not found
      if (users[0] === undefined) return {};
      return users[0];
    });
  if (!user) throw new Error(`User with id ${address} not found`);
  return user;
};

export const checkIfUserExists = (username: string): boolean => {
  const user = db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.username, username))
    .then((users) => {
      users === undefined ? [] : users;
    });
  return user.length > 0;
};

export const deleteUser = async (id: string) => {
  await db.delete(dbSchema.users).where(eq(dbSchema.users.id, id));
};

export const setUsername = async (id: string, username: string) => {
  await db
    .update(dbSchema.users)
    .set({ username })
    .where(eq(dbSchema.users.id, id));
};
