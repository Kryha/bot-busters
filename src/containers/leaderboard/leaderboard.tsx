import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";

import { type LeaderboardData } from "~/types";
import { isValidSession } from "~/utils/session.js";
import { AddScoreTable, LeaderboardTable } from "~/components/tables";
import { leaderboardData } from "~/constants";
import { text } from "~/assets/text";
import { fakeCountdown } from "~/constants/fake-data/landing.js";
import { styles } from "./styles.js";

export const LeaderBoard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<LeaderboardData[]>([]);
  const itemsPerPage = 6;
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const isGamePlayed = true;

  const loadMoreData = useCallback(() => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const newData: LeaderboardData[] = leaderboardData.slice(0, endIndex);

    setCurrentData(newData);
  }, [currentPage]);

  useEffect(() => {
    loadMoreData();
  }, [currentPage, loadMoreData]);

  const intersectionRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Typography variant="h1" color="common.black" sx={styles.text}>
        {text.leaderboard.dailyLeaderboard}
      </Typography>
      <Box>
        <LeaderboardTable leaderboard={currentData} />
        <Box ref={intersectionRef} />
      </Box>
      <AddScoreTable
        isAuthenticated={isAuthenticated}
        isGamePlayed={isGamePlayed}
        countdown={fakeCountdown}
      />
    </>
  );
};
