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
      .transform((val) => Number(val)),
    HUGGING_FACE_TOKEN: z.string(),
    RECAPTCHA_SECRET_KEY: z.string().min(1),
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
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
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
    HUGGING_FACE_TOKEN: process.env.HUGGING_FACE_TOKEN,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
