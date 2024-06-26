import { type Config } from "drizzle-kit";

export default {
  schema: "./dist/server/db/schema.js",
  driver: "pg",
  out: "./migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  tablesFilter: ["bot_busters_*"],
} satisfies Config;
