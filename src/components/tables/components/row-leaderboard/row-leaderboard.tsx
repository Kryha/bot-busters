import { type FC } from "react";
import {
  Stack,
  type SxProps,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { type LeaderboardData } from "~/types/index.js";
import { BotArrowIcon } from "~/assets/icons/index.js";
import { styles } from "./styles.js";

interface Props {
  leaderboard: LeaderboardData;
  isBlurred?: boolean;
  userRow?: boolean;
}

export const RowLeaderboard: FC<Props> = ({
  leaderboard,
  isBlurred,
  userRow,
}) => {
  const cellStyle = {
    ...styles.cell,
    ...(userRow && styles.userCell),
  };
  const rankingCellStyle = {
    ...styles.ranking,
    ...(userRow && styles.userCell),
  } as SxProps;

  return (
    <TableRow key={leaderboard.rank.toString()} sx={styles.tableRow(isBlurred)}>
      <TableCell component="td" scope="row">
        <Stack sx={styles.rank}>
          {userRow && <BotArrowIcon style={{ marginRight: "20px" }} />}
          <Typography
            variant="body1"
            sx={rankingCellStyle}
            color="customGrey.main"
          >
            {leaderboard.rank}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Stack sx={styles.container}>
          <Typography variant="body1" sx={cellStyle} color="customGrey.main">
            {leaderboard.username}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" sx={cellStyle} color="customGrey.main">
          {leaderboard.matchesPlayed}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" sx={cellStyle} color="customGrey.main">
          {leaderboard.score}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
