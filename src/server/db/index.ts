import { env } from "@/env.cjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(env.DATABASE_URL);

import * as schema from "./schema/";
export const db = drizzle(queryClient, { schema });

export const dbSchema = schema;
export const closeDbConnection = async () => {
  await queryClient.end();
};
