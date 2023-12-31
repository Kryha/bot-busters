import { type FC } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";

import { type LeaderboardData } from "~/types/index.js";
import { text } from "~/assets/text/index.js";

import { Header, RowLeaderboard } from "./components/index.js";
import { COLUMN_WIDTH } from "./constants.js";
import { styles } from "./styles.js";

interface Props {
  leaderboard: LeaderboardData[];
}

export const LeaderboardTable: FC<Props> = ({ leaderboard }) => {
  if (!leaderboard) return;

  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} aria-label="simple table">
        <colgroup>
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.lg} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
        </colgroup>
        <Header cells={text.leaderboard.leaderboardColumns} />
        <TableBody>
          {leaderboard.map((leaderboard, index) => (
            <RowLeaderboard key={index} leaderboard={leaderboard} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
