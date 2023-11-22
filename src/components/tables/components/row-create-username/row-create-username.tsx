import { type FC } from "react";
import {
  Avatar,
  Button,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { text } from "@/assets/text";
import { useCreateRandomUsername } from "@/hooks/name-generator";
import { styles } from "./styles";

interface RowCreateUsernameProps {
  onSetUsername: (username: string) => Promise<void>;
  error?: string;
}

export const RowCreateUsername: FC<RowCreateUsernameProps> = ({
  onSetUsername,
  error: _,
}) => {
  const { username, setUsername } = useCreateRandomUsername();

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
            <Avatar alt="avatar" sx={styles.avatar}>
              {text.leaderboard.avatarEmoji}
            </Avatar>
            {/* TODO: uncomment after fixing styling */}
            {/* {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )} */}
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
