export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { db } = await import("@/server/db");
    const { sql } = await import("drizzle-orm");

    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector`);
  }
}
