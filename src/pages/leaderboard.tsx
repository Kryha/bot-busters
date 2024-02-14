import { useEffect, useMemo } from "react";
import { CircularProgress } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";

import { LeaderboardTable } from "~/components/tables/index.js";
import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { isClient } from "~/utils/client.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { errorMessage } from "~/constants/error-messages.js";

const USERS_PER_PAGE = 20;

const LeaderBoard = () => {
  const { showBoundary } = useErrorBoundary();

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

  if (getRankedUsers.isLoading) return <CircularProgress />;

  return (
    <PageLayout title={text.leaderboard.leaderboard}>
      <LeaderboardTable leaderboard={leaderboardData} />
    </PageLayout>
  );
};

export default LeaderBoard;
