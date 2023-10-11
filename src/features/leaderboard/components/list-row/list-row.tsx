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
import { type Leaderboard } from "@/types";

interface Props {
  leaderboard: Leaderboard;
}

export const ListRow: FC<Props> = ({ leaderboard }) => {
  return (
    <>
      <ListItemIcon>
        <Typography variant="h3" color="primary.main">
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
            <Typography variant="h5" color="secondary.main">
              {leaderboard.username}
            </Typography>
            <Typography variant="body2" color="secondary.light">
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
