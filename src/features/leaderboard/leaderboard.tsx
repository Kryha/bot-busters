import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stack } from "@mui/material";

import { LeaderboardPagination } from "./components";
import { styles } from "./styles";
import { leaderboardData } from "@/constants";
import { LeaderboardTable } from "@/components/tables";
import { type LeaderboardData } from "@/types";

export const Leaderboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<LeaderboardData[]>([]);
  const itemsPerPage = 6;

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
    <Stack sx={styles.wrapper}>
      <LeaderboardTable leaderboardData={currentData} />
      <div ref={intersectionRef}></div>
    </Stack>
  );
};
