import { useState } from "react";
import { Stack, Typography } from "@mui/material";

import { LeaderboardList, LeaderboardPagination } from "./components";
import { leaderboard } from "./fake-data";
import { text } from "./assets";
import { styles } from "./styles";

export const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = leaderboard.slice(startIndex, endIndex);

  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Typography variant="h2" sx={styles.text}>
          {text.general.leaderboard}
        </Typography>
        <Typography variant="body1" sx={styles.text}>
          {text.general.leaderboardDescription}
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
