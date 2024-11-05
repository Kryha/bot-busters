import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  json,
  pgTableCreator,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { PUBLIC_KEY_LENGTH } from "~/constants/index.js";
import { type MatchRoom, type StoredChatMessage } from "~/types/index.js";

export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const users = bbPgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  coinbaseUuid: uuid("coinbase_uuid").unique(),
  score: integer("score").default(0).notNull(),
  botsBusted: integer("bots_busted").default(0).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  rank: one(ranks, {
    fields: [users.id],
    references: [ranks.userId],
  }),
  oldRanks: many(oldRanks),
}));

export const userSchema = createSelectSchema(users);
export type User = z.infer<typeof userSchema>;

export const userAchievements = bbPgTable("user_achievement", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  achievementId: varchar("achievement_id", { length: 32 }).notNull(),
  achievedAt: timestamp("achieved_at").notNull(),
});

export const userAchievementsSchema = createInsertSchema(userAchievements);
export type UserAchievements = z.infer<typeof userAchievementsSchema>;

export const ranks = bbPgTable("rank", {
  userId: uuid("user_id")
    .references(() => users.id)
    .primaryKey(),
  position: integer("position").notNull().unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const oldRanks = bbPgTable(
  "old_rank",
  {
    season: integer("season").notNull(),
    userId: uuid("user_id").references(() => users.id),
    position: integer("position").notNull(),
    score: integer("score").default(0).notNull(),
    botsBusted: integer("bots_busted").default(0).notNull(),
    createdAt: timestamp("created_at"),
    expiredAt: timestamp("expired_at").default(sql`CURRENT_TIMESTAMP`),
    prizeClaimed: boolean("prize_claimed").default(false).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.season] }),
  }),
);

export const oldRanksRelations = relations(oldRanks, ({ one }) => ({
  user: one(users, {
    fields: [oldRanks.userId],
    references: [users.id],
  }),
}));

export const matches = bbPgTable("match", {
  id: uuid("id").primaryKey(),
  createdAt: date("created_at")
    .notNull()
    .default(sql`CURRENT_DATE`),
  room: json("room").notNull().$type<MatchRoom>(),
  messages: json("messages").notNull().$type<StoredChatMessage[]>().default([]),
  season: integer("season").notNull(),
});

export const usersToMatches = bbPgTable(
  "user_match",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id),
  },
  (table) => {
    return {
      id: primaryKey({ name: "id", columns: [table.userId, table.matchId] }),
    };
  },
);
export const usersToMatchesSchema = createInsertSchema(usersToMatches);
export type UserToMatch = z.infer<typeof usersToMatchesSchema>;
