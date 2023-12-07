import { useState, type FC, useEffect } from "react";
import {
  Alert,
  Avatar,
  Button,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { text } from "~/assets/text/index.js";
import { getRandomUsername } from "~/utils/username.js";

import { styles } from "./styles.js";

interface RowCreateUsernameProps {
  onSetUsername: (username: string) => Promise<void>;
  error?: string;
}

export const RowCreateUsername: FC<RowCreateUsernameProps> = ({
  onSetUsername,
  error,
}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = getRandomUsername();
    setUsername(name.replace(/[0-9]/g, ""));
  }, []);

  return (
    <>
      <TableRow sx={styles.tableRow}>
        <TableCell component="th" scope="row" sx={styles.tableCell}>
          <Typography variant="body1" color="secondary.dark">
            {text.leaderboard.leaderboardRank}
          </Typography>
        </TableCell>
        <TableCell sx={styles.select}>
          <Stack sx={styles.wrapper}>
            {error && <Alert severity="error">{error}</Alert>}
            <Avatar alt="avatar" sx={styles.avatar}>
              {text.leaderboard.avatarEmoji}
            </Avatar>
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
              onClick={() => void onSetUsername(username)}
            >
              <Typography variant="button" sx={styles.buttonText}>
                {text.leaderboard.useNickname}
              </Typography>
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
};
