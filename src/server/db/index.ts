import { env } from "@/env.cjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/";
import { pgTableCreator } from "drizzle-orm/pg-core";

const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });

export const bbPgTable = pgTableCreator((name) => `bot_busters_${name}`);

export const dbSchema = schema;

export const closeDbConnection = async () => {
  await queryClient.end();
};
