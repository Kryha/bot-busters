export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const { db } = await import("~/server/db/index.js");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    await migrate(db as any, { migrationsFolder: "./migrations" });

    console.log(`Next server running in ${process.env.NODE_ENV} environment`);

    console.log("========================================");
  }
}
