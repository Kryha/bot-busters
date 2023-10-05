import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });

export const dbSchema = schema;
