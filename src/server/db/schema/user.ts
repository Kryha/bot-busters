import { eq } from "drizzle-orm";
import { db } from "../index";
import { PUBLIC_KEY_LENGTH } from "@/constants";
import {
  date,
  integer,
  pgTableCreator,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

/**
 * Multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const users = bbPgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }).unique(),
  score: integer("score").default(0).notNull(),
  createdAt: date("createdAt").defaultNow(),
});

export const userSchema = createInsertSchema(users);
export type User = z.infer<typeof userSchema>;

// This is only here for testing purposes
export const deleteAllUsers = async () => {
  await db.delete(users);
};

export const insertAnonymousUsers = async () => {
  const newUser = await db.insert(users).values({}).returning();

  return newUser.at(0);
};

export const insertVerifiedUser = async (
  address: string,
  username: string
): Promise<User | undefined> => {
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

export const selectUserByAddress = async (
  address: string
): Promise<User | undefined> => {
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

export const setUsername = async (
  id: string,
  username: string
): Promise<User | undefined> => {
  const updatedUsers = await db
    .update(users)
    .set({ username })
    .where(eq(users.id, id))
    .returning();

  return updatedUsers.at(0);
};

export const setUserScore = async (id: string, score: number) => {
  const updatedUsers = await db
    .update(users)
    .set({ score })
    .where(eq(users.id, id))
    .returning();

  return updatedUsers.at(0);
};