import { type Config } from "drizzle-kit";

export default {
  schema: "./dist/server/db/schema.js",
  dialect: "postgresql",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["bot_busters_*"],
} satisfies Config;
