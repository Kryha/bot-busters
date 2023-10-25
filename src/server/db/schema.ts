import { PUBLIC_KEY_LENGTH } from "@/constants";
import { date, integer, pgTableCreator, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
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
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  score: integer("score").default(0).notNull(),
  createdAt: date("createdAt").defaultNow(),
});

export const userSchema = createInsertSchema(users);
export type User = z.infer<typeof userSchema>;
