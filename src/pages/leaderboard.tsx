import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { CircularProgress, Typography } from "@mui/material";

import { isValidSession } from "~/utils/session.js";
import { AddScoreTable, LeaderboardTable } from "~/components/tables/index.js";
import { text } from "~/assets/text/index.js";
import { styles } from "~/styles/pages/leaderboard.js";
import { fakeCountdown } from "~/constants/fake-data/landing.js";
import { api } from "~/utils/api.js";
import { isClient } from "~/utils/client.js";

const USERS_PER_PAGE = 20;

const LeaderBoard = () => {
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);

  const isGamePlayed = true;

  const getRankedUsers = api.user.getRankedUsers.useInfiniteQuery(
    {
      limit: USERS_PER_PAGE,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: 0,
    },
  );

  const leaderboardData = useMemo(
    () => getRankedUsers.data?.pages.flatMap((page) => page.players),
    [getRankedUsers.data?.pages],
  );

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
        getRankedUsers
          .fetchNextPage()
          .catch((err) => console.error("Fetching page:", err));
      }
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [getRankedUsers]);

  if (getRankedUsers.isLoading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h1" color="common.black" sx={styles.text}>
        {text.leaderboard.dailyLeaderboard}
      </Typography>

      <LeaderboardTable leaderboard={leaderboardData} />

      {/*TODO: Add the current user score + move to main table */}
      <AddScoreTable
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        countdown={fakeCountdown}
      />
    </>
  );
};

export default LeaderBoard;
