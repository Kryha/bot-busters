import { PUBLIC_KEY_LENGTH } from "@/constants";
import { date, pgTableCreator, varchar } from "drizzle-orm/pg-core";

/**
 * Multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const users = bbPgTable("user", {
  publicKey: varchar("publicKey", { length: PUBLIC_KEY_LENGTH }).primaryKey(),
  createdAt: date("createdAt").defaultNow(),
});
