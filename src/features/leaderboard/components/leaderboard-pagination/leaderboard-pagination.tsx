import { type ChangeEvent, type FC } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { styles } from "./styles";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (_event: ChangeEvent<unknown>, newPage: number) => void;
}

export const LeaderboardPagination: FC<Props> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={currentPage}
      count={totalPages}
      onChange={handlePageChange}
      sx={styles.pagination}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
          sx={styles.paginationItem}
        />
      )}
    />
  );
};
