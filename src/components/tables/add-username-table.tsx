import { Table, TableBody, TableContainer } from "@mui/material";

import { leaderboardData } from "@/constants";
import { LeaderboardRow } from "./leaderboard-row";
import { CreateUsernameRow } from "./create-username-row";
import { styles } from "./styles";
import { COLUMN_WIDTH } from "./constants";

export const AddUsernameTable = () => {
  const usernameSelectRow = 3;
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
            if (index === usernameSelectRow)
              return (
                <CreateUsernameRow key={index} leaderboard={leaderboard} />
              );
            return (
              <LeaderboardRow key={index} leaderboard={leaderboard} isBlurred />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
