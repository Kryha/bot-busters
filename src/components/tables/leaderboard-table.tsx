import { type FC } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";

import { text } from "@/assets/text";
import { type LeaderboardData } from "@/types";
import { Header } from "./header";
import { LeaderboardRow } from "./leaderboard-row";
import { COLUMN_WIDTH } from "./constants";
import { styles } from "./styles";

interface Props {
  leaderboardData: LeaderboardData[];
}

export const LeaderboardTable: FC<Props> = ({ leaderboardData }) => {
  if (!leaderboardData) return;
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
          {leaderboardData.map((leaderboard, index) => (
            <LeaderboardRow key={index} leaderboard={leaderboard} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
