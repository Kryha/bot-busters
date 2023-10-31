import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
} from "react";
import { Stack } from "@mui/material";

import { LeaderboardPagination } from "./components";
import { styles } from "./styles";
import { leaderboardData } from "@/constants";
import { LeaderboardTable } from "@/components/tables";
import { type LeaderboardData } from "@/types";

export const Leaderboard: FC = () => {
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
  if (!currentData) return;
  return (
    <Stack sx={styles.wrapper}>
      <Stack>
        <Stack sx={styles.statsWrapper}>
          <Stack sx={styles.statsContainer}>
            {/* TODO: change colors */}
            {/*  button needs to be the same size as text */}
            <Button
              variant="contained"
              size="medium"
              sx={styles.connectButton}
              onClick={() => void router.push(pages.login)}
            >
              {text.landing.connectLeoWallet}
            </Button>
            <Typography variant="body1">{text.landing.toPlayWith}</Typography>
          </Stack>
        </Stack>
        <Stack sx={styles.textContainer}>
          <Typography variant="h1" sx={styles.title}>
            {text.landing.appName}
          </Typography>

          <Stack sx={styles.description}>
            <Typography variant="h5">
              {text.landing.descriptionPart1}
            </Typography>
            <Typography variant="h5">
              {text.landing.descriptionPart2}
            </Typography>
          </Stack>
          {/* <Button
            variant="contained"
            disabled={join.status === "loading"}
            onClick={() => void router.push(pages.lobby)}
            sx={styles.startGameButton}
            color="info"
          >
            <Typography variant="h3">{text.landing.startNewGame}</Typography>
          </Button> */}
          <LeaderboardToggleButton />
          <Leaderboard />
        </Stack>
      </Stack>
      {/* <LeaderboardTable leaderboardData={currentData} /> */}
      <div ref={intersectionRef}></div>
    </Stack>
  );
};
