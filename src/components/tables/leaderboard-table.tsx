import { type FC } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";

import { type LeaderboardData } from "~/types/index.js";
import { text } from "~/assets/text/index.js";

import { Header, RowLeaderboard } from "./components/index.js";
import { COLUMN_WIDTH } from "./constants.js";
import { styles } from "./styles.js";

interface Props {
  leaderboard?: LeaderboardData[];
}

// TODO: remove
const fakeData = [1,2,3,4,5,6,7,8,9,10].map((_)=>({
  id: _.toString(),
  username: (Math.random() + 1).toString(36).substring(2),
  score: Math.floor(Math.random()*1000),
  matchesPlayed: Math.floor(Math.random()*100),
  rank: _,
} satisfies LeaderboardData));

export const LeaderboardTable: FC<Props> = ({ leaderboard = [] }) => {
  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} stickyHeader aria-label="simple table">
        <colgroup>
          <col width={COLUMN_WIDTH.sm} />
          <col width={COLUMN_WIDTH.lg} />
          <col width={COLUMN_WIDTH.md} />
          <col width={COLUMN_WIDTH.md} />
        </colgroup>
        <Header cells={text.leaderboard.leaderboardColumns} />
        <TableBody>
          {fakeData.map((leaderboard, index) => (
            <RowLeaderboard key={index} leaderboard={leaderboard} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
