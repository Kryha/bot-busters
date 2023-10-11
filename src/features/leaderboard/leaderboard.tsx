import { type ChangeEvent, useState } from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";

import { LeaderboardList, LeaderboardPagination } from "./components";
import { leaderboard } from "./fake-data";
import { text } from "./assets";
import { styles } from "./styles";

export const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const heading = isSmallScreen ? "h3" : "h2";
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = leaderboard.slice(startIndex, endIndex);

  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Typography variant={heading} sx={styles.text}>
          {text.leaderboard}
        </Typography>
        <Typography variant="body1" sx={styles.text}>
          {text.leaderboardDescription}
        </Typography>
      </Stack>
      <LeaderboardList leaderboard={currentData} />
      <LeaderboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Stack>
  );
};
