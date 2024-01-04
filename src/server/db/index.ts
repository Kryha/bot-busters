import postgres from "postgres";
import { type ExtractTablesWithRelations } from "drizzle-orm";
import {
  type PostgresJsQueryResultHKT,
  drizzle,
} from "drizzle-orm/postgres-js";
import { type PgTransaction } from "drizzle-orm/pg-core/session.js";

import { env } from "~/env.mjs";

import * as schema from "./schema.js";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, { schema });

export const dbSchema = schema;

export type BBPgTransaction = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export const closeDbConnection = async () => {
  await queryClient.end();
};
