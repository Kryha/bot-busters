import { type ChangeEvent, useState } from "react";
import { Stack } from "@mui/material";

import { LeaderboardPagination } from "./components";
import { styles } from "./styles";
import { leaderboardData } from "@/constants";
import { LeaderboardTable } from "@/components/tables";

export const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = leaderboardData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);

  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Stack sx={styles.wrapper}>
      <LeaderboardTable leaderboardData={currentData} />
      <LeaderboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Stack>
  );
};
