import { Table, TableBody, TableContainer } from "@mui/material";

import { leaderboardData } from "~/constants/index.js";

import { RowLeaderboard } from "./components/index.js";
import { styles } from "./styles.js";
import { COLUMN_WIDTH } from "./constants.js";

export const AddUsernameTable = () => {
  return (
    <TableContainer sx={styles.tableContainer}>
      <Table sx={styles.table} aria-label="simple table">
        <colgroup>
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.lg} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
        </colgroup>

        <TableBody>
          {leaderboardData.map((leaderboard, index) => {
            return (
              <RowLeaderboard key={index} leaderboard={leaderboard} isBlurred />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
