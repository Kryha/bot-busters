import { api } from "~/utils/api.js";

export const usePastSeasonRankedUsers = () => {
  const currentSeason = api.rank.getCurrentSeason.useQuery();

  const season = (() => {
    const { data } = currentSeason;
    if (!data || data <= 1) return;
    return data - 1;
  })();

  const rankedUsers = api.user.getRankedUsers.useQuery(
    {
      limit: 1,
      season,
    },
    {
      enabled: !!season,
    },
  );

  return { rankedUsers, pastSeason: season };
};
