import { sql } from "drizzle-orm/sql";
import cron from "node-cron";
import { db, dbSchema } from "~/server/db/index.js";

const { users } = dbSchema;

// Function to perform your SQL query
async function runDatabaseTask(): Promise<void> {
  try {
    await db
      .delete(users)
      .where(
        sql`bot_busters_user.created_at < NOW() - INTERVAL '24 HOURS' AND bot_busters_user.address IS NULL AND bot_busters_user.username IS NULL;`
      );
  } catch (err) {
    console.error(err);
  }
}

// Schedule the task to run every 24 hours
cron.schedule("0 0 * * *", () => {
  console.log("Running a task every 24 hours");
  runDatabaseTask().catch((err) => console.error(err));
});
