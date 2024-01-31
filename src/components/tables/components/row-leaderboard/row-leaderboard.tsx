import { type FC } from "react";
import { Stack, type SxProps, TableCell, TableRow, Typography } from "@mui/material";

import { type LeaderboardData } from "~/types/index.js";

import { styles } from "./styles.js";
import { BotArrowIcon } from "~/assets/icons/index.js";

interface Props {
  leaderboard: LeaderboardData;
  isBlurred?: boolean;
  userRow?: boolean;
}

export const RowLeaderboard: FC<Props> = ({ leaderboard, isBlurred, userRow }) => {
  const cellStyle = {
    ...styles.cell,
    ...(userRow && styles.userCell)
  };
  const rankingCellStyle = {
    ...styles.ranking,
    ...(userRow && styles.userCell)
  } as SxProps;

  return (
    <TableRow key={leaderboard.rank.toString()} sx={styles.tableRow(isBlurred)}>
      <TableCell component="th" scope="row">
        <Typography variant="body2" sx={rankingCellStyle} color="customGrey.main">
          {userRow && <BotArrowIcon style={{ marginRight: "20px"}}/>}
          {leaderboard.rank}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack sx={styles.container}>
          <Typography variant="body2" sx={cellStyle} color="customGrey.main">
            {leaderboard.username}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={cellStyle} color="customGrey.main">
          {leaderboard.matchesPlayed}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={cellStyle} color="customGrey.main">
          {leaderboard.score}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
