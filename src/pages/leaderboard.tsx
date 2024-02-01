import { useEffect, useMemo } from "react";
import { CircularProgress } from "@mui/material";

import { LeaderboardTable } from "~/components/tables/index.js";
import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { isClient } from "~/utils/client.js";
import { PageHeader } from "~/containers/page-header/index.js";

const USERS_PER_PAGE = 20;

const LeaderBoard = () => {
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
      <PageHeader text={text.leaderboard.leaderboard} />

      {/* TODO: if user is logged in, pass their data as param to show their score on top */}
      <LeaderboardTable leaderboard={leaderboardData} />
    </>
  );
};

export default LeaderBoard;
