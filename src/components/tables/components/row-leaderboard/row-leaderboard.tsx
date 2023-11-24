import { type FC } from "react";
import { Avatar, Stack, TableCell, TableRow, Typography } from "@mui/material";

import { type LeaderboardData } from "~/types/index.js";
import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";

interface Props {
  leaderboard: LeaderboardData;
  isBlurred?: boolean;
}

export const RowLeaderboard: FC<Props> = ({ leaderboard, isBlurred }) => {
  return (
    <TableRow key={leaderboard.rank} sx={styles.tableRow(isBlurred)}>
      <TableCell component="th" scope="row">
        <Typography variant="body1" color="customGrey.main">
          {text.leaderboard.rankNumber(leaderboard.rank)}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack sx={styles.container}>
          <Avatar alt="avatar" sx={styles.avatar}>
            {text.leaderboard.avatarEmoji}
          </Avatar>
          <Typography variant="body1" color="customGrey.main">
            {leaderboard.username}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="customGrey.main">
          {leaderboard.gamesPlayed}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="customGrey.main">
          {leaderboard.score}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="customGrey.main">
          {text.leaderboard.aleoCredits(leaderboard.payout)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
