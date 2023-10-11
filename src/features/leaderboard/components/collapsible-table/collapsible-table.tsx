import { useState, type FC } from "react";
import {
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Row } from "@/features/leaderboard/components";
import { type Leaderboard } from "@/features/leaderboard/fake-data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  leaderboard: Leaderboard[];
}

export const CollapsibleTable: FC<Props> = ({ leaderboard }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    <>
      <TableContainer
        component={Paper}
        sx={{ width: { sm: "60%", width: "90%" } }}
      >
        <Table aria-label="collapsible table">
          {/* <TableHeader /> */}
          <TableBody>
            {currentData.map((data, index) => (
              <Row key={index} leaderboard={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </>
  );
};
