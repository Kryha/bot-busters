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
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  score: integer("score").default(0).notNull(),
  createdAt: date("createdAt").defaultNow(),
});

export const userSchema = createInsertSchema(users);
export type User = z.infer<typeof userSchema>;

export const insertAnonymousUsers = async (): Promise<User | undefined> => {
  return await db
    .insert(users)
    .values({})
    .returning()
    .then((users) => users[0]);
};

export const insertVerifiedUser = async (
  address: string,
  username: string
): Promise<User | undefined> => {
  return await db
    .insert(users)
    .values({ address, username })
    .returning()
    .then((users) => users[0]);
};

export const selectUserById = async (id: string): Promise<User | undefined> => {
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
  await db.delete(users).where(eq(users.id, id)).returning();
};

export const setUsername = async (id: string, username: string) => {
  return await db
    .update(users)
    .set({ username })
    .where(eq(users.id, id))
    .returning();
};

export const setUserScore = async (id: string, score: number) => {
  return await db
    .update(users)
    .set({ score })
    .where(eq(users.id, id))
    .returning();
};
