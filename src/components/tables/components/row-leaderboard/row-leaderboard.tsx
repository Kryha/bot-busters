import { type FC } from "react";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";

import { type LeaderboardData } from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  leaderboard: LeaderboardData;
  isBlurred?: boolean;
}

export const RowLeaderboard: FC<Props> = ({ leaderboard, isBlurred }) => {
  return (
    <TableRow key={leaderboard.rank.toString()} sx={styles.tableRow(isBlurred)}>
      <TableCell component="th" scope="row">
        <Typography variant="body2" sx={styles.ranking} color="customGrey.main">
          {leaderboard.rank}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack sx={styles.container}>
          <Typography variant="body2" sx={styles.cell} color="customGrey.main">
            {leaderboard.username}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={styles.cell} color="customGrey.main">
          {leaderboard.matchesPlayed}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={styles.cell} color="customGrey.main">
          {leaderboard.score}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
