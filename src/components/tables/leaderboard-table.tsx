import { type FC } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";

import { type RankedUser, type RankedLoggedUser } from "~/types/index.js";
import { text } from "~/assets/text/index.js";

import { Header, RowLeaderboard } from "./components/index.js";
import { COLUMN_WIDTH } from "./constants.js";
import { styles } from "./styles.js";

interface Props {
  rankedUsers: RankedUser[];
  loggedUser: RankedLoggedUser;
}

export const LeaderboardTable: FC<Props> = ({ rankedUsers, loggedUser }) => {
  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} stickyHeader aria-label="simple table">
        <colgroup>
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.lg} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
        </colgroup>
        <Header cells={text.leaderboard.leaderboardColumns} cellsToAlign={1} />
        <TableBody>
          {loggedUser?.username && (
            <RowLeaderboard userRow rankedUser={loggedUser} />
          )}
          {rankedUsers.map((entry, index) => (
            <RowLeaderboard key={index} rankedUser={entry} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
