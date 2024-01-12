import { relations, sql } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";
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
import { type MatchRoom } from "~/types/index.js";

export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const users = bbPgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  score: integer("score").default(0).notNull(),
  // TODO: add zPass
  // zPass: json("zPass"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
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
  userId: uuid("user_id")
    .references(() => users.id)
    .primaryKey(),
  position: integer("position").notNull().unique(),
});

export const rankSchema = createInsertSchema(ranks);
export type Rank = z.infer<typeof rankSchema>;

export const matches = bbPgTable("match", {
  id: uuid("id").primaryKey(),
  room: json("room").notNull().$type<MatchRoom>(),
});

export const usersToMatches = bbPgTable("user_match", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  matchId: uuid("match_id")
    .notNull()
    .references(() => matches.id),
});
export const usersToMatchesSchema = createInsertSchema(usersToMatches);
export type UserToMatch = z.infer<typeof usersToMatchesSchema>;
