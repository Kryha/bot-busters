import { type FC } from "react";
import {
  Avatar,
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router.js";

import { type LeaderboardData } from "~/types/index.js";
import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import { calcPayout } from "~/utils/leaderboard.js";

import { styles } from "./styles.js";

interface Props {
  player: LeaderboardData;
  isAuthenticated: boolean;
  isGamePlayed: boolean;
}

export const RowAddScore: FC<Props> = ({ player, isAuthenticated }) => {
  const router = useRouter();

  return (
    <TableRow key={player.rank} sx={styles.tableRow()}>
      <TableCell component="th" scope="row">
        <Typography variant="body1" color="customGrey.main">
          {text.leaderboard.rankNumber(player.rank)}
        </Typography>
      </TableCell>
      <TableCell>
        {!isAuthenticated ? (
          <Button
            variant="contained"
            color="blueGrey"
            onClick={() => void router.push(pages.login)}
          >
            {text.leaderboard.addScoreToLeaderboard}
          </Button>
        ) : (
          <Stack sx={styles.container}>
            <Avatar alt="avatar" sx={styles.avatar}>
              {text.leaderboard.avatarEmoji}
            </Avatar>
            <Typography variant="body1" color="customGrey.main">
              {player.username}
            </Typography>
          </Stack>
        )}
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="customGrey.main">
          {player.matchesPlayed?.length}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="customGrey.main">
          {player.score}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="customGrey.main">
          {text.leaderboard.aleoCredits(calcPayout(player.rank))}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
