import { PUBLIC_KEY_LENGTH } from "@/constants";
import { date, integer, pgTableCreator, varchar } from "drizzle-orm/pg-core";
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
  id: varchar("id", { length: 36 }).unique().primaryKey(),
  username: varchar("username", { length: 32 }).unique().notNull(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  score: integer("score").default(0).notNull(),
  createdAt: date("createdAt").defaultNow(),
});

export const userSchema = createInsertSchema(users);

export type User = z.infer<typeof userSchema>;
