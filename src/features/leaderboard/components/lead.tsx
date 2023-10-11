import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Typography,
  type SvgIconTypeMap,
} from "@mui/material";
import { type FC } from "react";
import { styles } from "./styles";
import { type OverridableComponent } from "@mui/material/OverridableComponent";
import { type Leaderboard } from "../fake-data";

interface Props {
  leaderboard: Leaderboard;
}

export const Lead: FC<Props> = ({ leaderboard }) => {
  // TODO: update styles and content
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar src={leaderboard.avatar}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack sx={styles.listUsername}>
              <Typography variant="h5">{leaderboard.name}</Typography>
              <Typography variant="body2" color="secondary.dark">
                {leaderboard.rank}
              </Typography>
            </Stack>
          }
          secondary={leaderboard.score}
          sx={styles.listItem}
        />
      </ListItemButton>
    </ListItem>
  );
};
