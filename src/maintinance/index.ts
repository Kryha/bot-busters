import { sql } from "drizzle-orm/sql";
import cron from "node-cron";
import { db, dbSchema } from "~/server/db/index.js";

const { users } = dbSchema;

// Function to perform your SQL query
async function runDatabaseTask(): Promise<void> {
  try {
    // Replace with your SQL query
    const result = await db.delete(users).where(sql`SELECT * FROM ;`);
  } catch (err) {
    console.error(err);
  }
}

// Schedule the task to run every 24 hours
cron.schedule("0 0 * * *", () => {
  console.log("Running a task every 24 hours");
  runDatabaseTask().catch((err) => console.error(err));
});
