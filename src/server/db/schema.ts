import { PUBLIC_KEY_LENGTH } from "@/constants";
import { date, pgTableCreator, varchar } from "drizzle-orm/pg-core";
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
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }).primaryKey(),
  createdAt: date("createdAt").defaultNow(),
});

export const userSchema = createInsertSchema(users);

export type User = z.infer<typeof userSchema>;
