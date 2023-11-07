import { bbPgTable } from "..";
import { integer, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";

export const ranks = bbPgTable("rank", {
  userId: uuid("userId")
    .references(() => users.id)
    .primaryKey(),
  position: integer("position").notNull().unique(),
});

// TODO: define `match` table for storing old matches
