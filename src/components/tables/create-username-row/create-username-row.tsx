/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

import { text } from "@/assets/text";
import { useCreateRandomUsername } from "@/hooks/name-generator";
import { pages } from "@/utils/router";
import { styles } from "./styles";

export const CreateUsernameRow: FC = ({}) => {
  const router = useRouter();
  const { username, setUsername } = useCreateRandomUsername();

  const handleSaveUsername = () => {
    setUsername(username);
    void router.push(pages.home);
  };

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
        </TableCell>
      </TableRow>
    </>
  );
};
