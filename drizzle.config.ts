import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/index.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  tablesFilter: ["bot_busters_*"],
} satisfies Config;
