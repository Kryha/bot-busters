import { dbSchema, User } from "@/server/db";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export const createEmptyUsers = (
  db: PostgresJsDatabase<typeof dbSchema>
): User => {
  const createdEmptyUsers = db
    .insert(dbSchema.users)
    .values({})
    .returning()
    .then((users) => users[0]);
  return createdEmptyUsers;
};

export const createAuthenticatedUser = (
  db: PostgresJsDatabase<typeof dbSchema>,
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
export const getUser = (
  db: PostgresJsDatabase<typeof dbSchema>,
  id: string
) => {
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

export const deleteUser = async (
  db: PostgresJsDatabase<typeof dbSchema>,
  id: string
) => {
  await db.delete(dbSchema.users).where(eq(dbSchema.users.id, id));
};

export const mergeUserAccounts = async (
  db: PostgresJsDatabase<typeof dbSchema>,
  id: string,
  newId: string,
  address: string,
  username: string
) => {
  const user = await getUser(db, id);
  const newUser = await getUser(db, newId);
};
