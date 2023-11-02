import { type FC } from "react";
import {
  Avatar,
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { type LeaderboardData } from "@/types";
import { text } from "@/assets/text";
import { styles } from "./styles";
import { useRouter } from "next/router";
import { pages } from "@/utils/router";

interface Props {
  leaderboard: LeaderboardData;
  isAuthenticated: boolean;
  isGamePlayed: boolean;
}

export const AddScoreRow: FC<Props> = ({ leaderboard, isAuthenticated }) => {
  const router = useRouter();
  return (
    <TableRow key={leaderboard.rank} sx={styles.tableRow()}>
      <TableCell component="th" scope="row">
        <Typography variant="body1" color="customGrey.main">
          {text.leaderboard.rankNumber(leaderboard.rank)}
        </Typography>
      </TableCell>
      <TableCell>
        {!isAuthenticated ? (
          <Button
            variant="contained"
            color="blueGrey"
            onClick={() => void router.push(pages.login)}
          >
            {text.landing.addScoreToLeaderboard}
          </Button>
        ) : (
          <Stack sx={styles.container}>
            <Avatar alt="avatar" sx={styles.avatar}>
              {text.leaderboard.avatarEmoji}
            </Avatar>
            <Typography variant="body1" color="customGrey.main">
              {leaderboard.username}
            </Typography>
          </Stack>
        )}
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
