/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  experimental: {
    instrumentationHook: true,
  },

  webpack: (webpackConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    webpackConfig.resolve.extensionAlias = {
      ".js": [".ts", ".js"],
      ".jsx": [".tsx", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return webpackConfig;
  },
};

export default config;
