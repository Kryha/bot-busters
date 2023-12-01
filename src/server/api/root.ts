import { userRouter, matchRouter, lobbyRouter } from "./routers/index.js";
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
});

// export type definition of API
export type AppRouter = typeof appRouter;
