import { relations, sql } from "drizzle-orm";
import {
  integer,
  varchar,
  uuid,
  pgTableCreator,
  timestamp,
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { PUBLIC_KEY_LENGTH } from "~/constants/index.js";

export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const users = bbPgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  score: integer("score").default(0).notNull(),
  // TODO: add zPass
  // zPass: json("zPass"),
  // TODO: Matches played []match ID
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ one }) => ({
  rank: one(ranks, {
    fields: [users.id],
    references: [ranks.userId],
  }),
}));

export const userSchema = createInsertSchema(users);
export type User = z.infer<typeof userSchema>;

export const ranks = bbPgTable("rank", {
  userId: uuid("userId")
    .references(() => users.id)
    .primaryKey(),
  position: integer("position").notNull().unique(),
});

export const rankSchema = createInsertSchema(ranks);
export type Rank = z.infer<typeof rankSchema>;

export const matches = bbPgTable("match", {
  id: uuid("id").primaryKey(),
  room: json("room").notNull(),
});
