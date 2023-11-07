import { integer, pgTableCreator, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const ranks = bbPgTable("rank", {
  userId: uuid("userId")
    .references(() => users.id)
    .primaryKey(),
  position: integer("position").notNull().unique(),
});
export const rankSchema = createInsertSchema(ranks);
export type Rank = z.infer<typeof rankSchema>;

export const usersRelations = relations(users, ({ one }) => ({
  rank: one(ranks, {
    fields: [users.id],
    references: [ranks.userId],
  }),
}));

// TODO: define `match` table for storing old matches
