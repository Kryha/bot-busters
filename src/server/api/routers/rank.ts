import { createTRPCRouter, publicProcedure } from "~/server/api/trpc.js";
import { getCurrentSeason } from "~/server/db/rank.js";

export const rankRouter = createTRPCRouter({
  getCurrentSeason: publicProcedure.query(async () => {
    const currentSeason = await getCurrentSeason();
    return currentSeason;
  }),
});
