import { type FC } from "react";
import {
  Avatar,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { styles } from "./styles";
import { type LeaderboardData } from "@/types";

interface Props {
  leaderboard: LeaderboardData;
}

export const ListRow: FC<Props> = ({ leaderboard }) => {
  return (
    <>
      <ListItemIcon>
        <Typography variant="h3" color="primary">
          {leaderboard.rank}
        </Typography>
      </ListItemIcon>
      <ListItemAvatar>
        <Avatar
          alt="avatar"
          src={leaderboard.avatar}
          variant="rounded"
          sx={styles.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Stack sx={styles.listUsername}>
            <Typography variant="h5" color="primary.light">
              {leaderboard.username}
            </Typography>
            <Typography variant="body2" color="primary">
              {leaderboard.score}
            </Typography>
          </Stack>
        }
        secondary={leaderboard.score}
        sx={styles.listItem}
      />
    </>
  );
};
