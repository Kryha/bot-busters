import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_URL_INTERNAL: z.string().url(),
    APP_URL: z.string().url(),
    PLAYERS_PER_MATCH: z
      .string()
      .default("5")
      .transform((val) => {
        const numVal = Number(val);
        if (isNaN(numVal) || numVal < 3) return 3;
        return numVal;
      }),
    ALEO_NETWORK_URL: z.string().url(),
    ALEO_PRIVATE_KEY: z.string().nonempty(),
    LEADERBOARD_PROGRAM_NAME: z.string().default("leaderboard.aleo"),
    AWS_REGION: z.string().default("eu-central-1"),
    BB_EMAIL: z.string().email().default("bot-busters@kryha.io"),
    AWS_ACCESS_KEY: z.string(),
    AWS_SECRET: z.string(),
    AWS_INFERENCE_URL: z.string().url(),
    LAMBDA_TOKEN: z.string(),
    RANKS_EXPIRATION_HOUR: z
      .string()
      .optional()
      .default("17")
      .transform((val) => {
        const numVal = parseInt(val);
        if (isNaN(numVal)) return 17;
        return numVal;
      }),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_WS_URL: z.string().url(),
    NEXT_PUBLIC_ALEO_NETWORK: z
      .enum(["testnet3", "mainnet", "localnet"])
      .default("testnet3"),
    NEXT_PUBLIC_MOCK_AUTH: z
      .enum(["true", "false"])
      .default("false")
      .transform((val) => (val === "true" ? true : false)),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXT_PUBLIC_ALEO_NETWORK: process.env.NEXT_PUBLIC_ALEO_NETWORK,
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_MOCK_AUTH: process.env.NEXT_PUBLIC_MOCK_AUTH,
    PLAYERS_PER_MATCH: process.env.PLAYERS_PER_MATCH,
    ALEO_NETWORK_URL: process.env.ALEO_NETWORK_URL,
    ALEO_PRIVATE_KEY: process.env.ALEO_PRIVATE_KEY,
    LEADERBOARD_PROGRAM_NAME: process.env.LEADERBOARD_PROGRAM_NAME,
    AWS_REGION: process.env.AWS_REGION,
    BB_EMAIL: process.env.BB_EMAIL,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET: process.env.AWS_SECRET,
    AWS_INFERENCE_URL: process.env.AWS_INFERENCE_URL,
    LAMBDA_TOKEN: process.env.LAMBDA_TOKEN,
    RANKS_EXPIRATION_HOUR: process.env.RANKS_EXPIRATION_HOUR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
