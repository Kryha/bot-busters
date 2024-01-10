export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
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

    console.log(`Next server running in ${process.env.NODE_ENV} environment`);

    console.log("========================================");
  }
}
