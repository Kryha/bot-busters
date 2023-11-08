import { PUBLIC_KEY_LENGTH } from "@/constants";
import { relations } from "drizzle-orm";
import {
  date,
  integer,
  varchar,
  uuid,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

// User table
export const users = bbPgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }).unique(),
  score: integer("score").default(0).notNull(),
  // TODO: add zPass
  // zPass: json("zPass"),

  createdAt: date("createdAt").defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  rank: one(ranks, {
    fields: [users.id],
    references: [ranks.userId],
  }),
}));

export const userSchema = createInsertSchema(users);
export type User = z.infer<typeof userSchema>;

// Rank table
export const ranks = bbPgTable("rank", {
  userId: uuid("userId")
    .references(() => users.id)
    .primaryKey(),
  position: integer("position").notNull().unique(),
});

export const rankSchema = createInsertSchema(ranks);
export type Rank = z.infer<typeof rankSchema>;

// TODO: define `match` table for storing old matches
