import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import {
  userRouter,
  matchRouter,
  lobbyRouter,
  supportRouter,
  rankRouter,
  coinbaseRouter,
} from "./routers/index.js";
import { createTRPCRouter } from "./trpc.js";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  lobby: lobbyRouter,
  match: matchRouter,
  user: userRouter,
  support: supportRouter,
  rank: rankRouter,
  coinbase: coinbaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
