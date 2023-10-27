/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC } from "react";
import { Avatar, Stack, TableCell, TableRow, Typography } from "@mui/material";

import { type LeaderboardData } from "@/types";
import { text } from "@/assets/text";
import { styles } from "./styles";

interface Props {
  leaderboard: LeaderboardData;
  isBlurred?: boolean;
}

export const LeaderboardRow: FC<Props> = ({ leaderboard, isBlurred }) => {
  return (
    <TableRow key={leaderboard.rank} sx={styles.tableRow(isBlurred)}>
      <TableCell component="th" scope="row">
        <Typography variant="body1" color="secondary.dark">
          {text.leaderboard.rankNumber(leaderboard.rank)}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack sx={styles.container}>
          <Avatar alt="avatar">{text.leaderboard.avatarEmoji}</Avatar>
          <Typography variant="body1" color="secondary.dark">
            {leaderboard.username}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary.dark">
          {leaderboard.gamesPlayed}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary.dark">
          {leaderboard.score}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary.dark">
          {text.leaderboard.aleoCredits(leaderboard.payout)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
