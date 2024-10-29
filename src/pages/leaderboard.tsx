import React, { useEffect, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";
import { LoadingPage } from "~/components/loading-page/index.js";
import { PageHeader } from "~/containers/page-header/index.js";
import { LeaderboardTable } from "~/components/tables/index.js";
import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { isClient } from "~/utils/client.js";
import { errorMessage } from "~/constants/error-messages.js";
import { styles } from "~/styles/pages/leaderboard.js";

const USERS_PER_PAGE = 20;

const LeaderBoard = () => {
  const { showBoundary } = useErrorBoundary();
  const [season, setSeason] = useState<"current" | "previous">("current");
  const { data: currentSeason } = api.rank.getCurrentSeason.useQuery();

  const seasonToRequest = (() => {
    if (!currentSeason) return;
    if (season === "current" || currentSeason <= 1) return currentSeason;
    return currentSeason - 1;
  })();

  const getRankedUsers = api.user.getRankedUsers.useInfiniteQuery(
    {
      limit: USERS_PER_PAGE,
      season: seasonToRequest,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: 0,
      enabled: !!seasonToRequest,
    },
  );

  const leaderboardData = useMemo(
    () => getRankedUsers.data?.pages.flatMap((page) => page.players) ?? [],
    [getRankedUsers.data?.pages],
  );

  const loggedUser = getRankedUsers.data?.pages[0]?.loggedUser;

  useEffect(() => {
    if (!isClient()) return;

    const handleScrollEvent = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const pages = getRankedUsers.data?.pages;

      // if users on last page are fewer than the users per page
      // then all users have been fetched and we should not fetch on scroll
      let allFetched = false;
      if (pages?.length) {
        const latestPage = pages[pages.length - 1];
        allFetched = latestPage!.players.length < USERS_PER_PAGE;
      }

      if (scrollTop + clientHeight >= scrollHeight - 5 && !allFetched) {
        getRankedUsers.fetchNextPage().catch((e) => {
          e instanceof Error
            ? console.error(`[${errorMessage.support}]: ${e.message}`, e)
            : console.error(e);

          showBoundary(errorMessage.support);
        });
      }
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [getRankedUsers, showBoundary]);

  return (
    <Stack sx={styles.container}>
      <PageHeader text={text.leaderboard.leaderboard} />

      <Stack flexDirection="row" gap={1}>
        <Typography
          variant="h3"
          sx={
            season === "previous"
              ? styles.dateSwitchSelected
              : styles.dateSwitchUnselected
          }
          onClick={() => {
            if (currentSeason && currentSeason > 1) setSeason("previous");
          }}
        >
          {text.leaderboard.yesterday}
        </Typography>
        <Typography
          variant="h3"
          sx={
            season === "current"
              ? styles.dateSwitchSelected
              : styles.dateSwitchUnselected
          }
          onClick={() => setSeason("current")}
        >
          {text.leaderboard.today}
        </Typography>
      </Stack>

      {getRankedUsers.isLoading ? (
        <LoadingPage />
      ) : (
        <LeaderboardTable
          rankedUsers={leaderboardData}
          loggedUser={loggedUser}
        />
      )}
    </Stack>
  );
};

export default LeaderBoard;
