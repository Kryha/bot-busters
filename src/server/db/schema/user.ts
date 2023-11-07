import { eq } from "drizzle-orm";
import { bbPgTable, db } from "../index";
import { PUBLIC_KEY_LENGTH } from "@/constants";
import { date, integer, varchar, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

export const users = bbPgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }).unique(),
  score: integer("score").default(0).notNull(),
  // TODO: add zPass
  // zPass: json("zPass"),

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

export const setUsername = async (id: string, username: string) => {
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
