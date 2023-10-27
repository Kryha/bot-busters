import { type FC } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { type LeaderboardData } from "@/types";
import { text } from "@/assets/text";
import { useMinidenticonImg } from "@/hooks/avatar-generator";
import { useCreateRandomUsername } from "@/hooks/name-generator";
import { pages } from "@/utils/router";
import { styles } from "./styles";

interface Props {
  leaderboard: LeaderboardData;
}

export const CreateUsernameRow: FC<Props> = ({ leaderboard }) => {
  const router = useRouter();
  const { username, setUsername } = useCreateRandomUsername();
  const avatar = useMinidenticonImg(username);

  const handleSaveUsername = () => {
    setUsername(username);
    void router.push(pages.home);
  };

  if (!leaderboard) return;

  return (
    <>
      <TableRow key={leaderboard.rank} sx={styles.tableRow}>
        <TableCell component="th" scope="row" sx={styles.tableCell}>
          <Typography variant="body1" color="secondary.dark">
            {text.leaderboard.rankNumber(leaderboard.rank)}
          </Typography>
        </TableCell>
        <TableCell sx={styles.select}>
          <Stack sx={styles.wrapper}>
            <Avatar src={avatar} alt="avatar" sx={styles.avatar} />
            <TextField
              id="outlined"
              value={username}
              sx={styles.input}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              variant="contained"
              sx={styles.button}
              color="info"
              onClick={handleSaveUsername}
            >
              <Typography variant="button" sx={styles.buttonText}>
                {text.leaderboard.useNickname}
              </Typography>
            </Button>
          </Stack>
          <Stack sx={styles.container}>
            <Avatar alt="avatar" />
            <Typography variant="body1" color="secondary.dark">
              {leaderboard.username}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={styles.tableCell}>
          <Typography variant="body1" color="secondary.dark">
            {leaderboard.gamesPlayed}
          </Typography>
        </TableCell>
        <TableCell sx={styles.tableCell}>
          <Typography variant="body1" color="secondary.dark">
            {leaderboard.score}
          </Typography>
        </TableCell>
        <TableCell sx={styles.tableCell}>
          <Typography variant="body1" color="secondary.dark">
            {text.leaderboard.aleoCredits(leaderboard.payout)}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};
