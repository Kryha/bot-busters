import { PUBLIC_KEY_LENGTH } from "@/constants";
import {
  date,
  integer,
  pgTableCreator,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";
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
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).unique(),
  address: varchar("address", { length: PUBLIC_KEY_LENGTH }),
  score: integer("score").default(0).notNull(),
  gamesPlayed: integer("gamesPlayed").default(0).notNull(),
  // TODO: add zPass
  // zPass: json("zPass"),

  createdAt: date("createdAt").defaultNow(),
});

// TODO: implement in score calculation flow
// export const ranks = bbPgTable("ranks", {});

export const userSchema = createInsertSchema(users);
export type User = z.infer<typeof userSchema>;
