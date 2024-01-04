export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { db } = await import("~/server/db/index.js");
    const { sql } = await import("drizzle-orm");
    const { exec } = await import("child_process");
    const { promisify } = await import("util");

    const pExec = promisify(exec);

    // TODO: find a more scalable way to perform this action
    const { stderr, stdout } = await pExec(
      `DATABASE_URL="${process.env.DATABASE_URL}" yarn drizzle-kit push:pg`
    );

    if (stderr) {
      throw new Error(stderr);
    }

    console.log(stdout);

    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector`);

    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_cron`);

    console.log("========================================");
    console.log("setting up cron jobs");

    await db.execute(
      sql`SELECT cron.schedule('0 10 * * *', $$DELETE FROM bot_busters_user WHERE bot_busters_user.created_at < NOW() - INTERVAL '24 HOURS' AND bot_busters_user.address IS NULL AND bot_busters_user.username IS NULL$$);`
    );

    console.log(`Next server running in ${process.env.NODE_ENV} environment`);

    console.log("========================================");
  }
}
