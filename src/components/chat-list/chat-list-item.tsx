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

interface Props {
  username: string;
  time: string;
  lastMessage?: string;
  AvatarImage: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

export const ChatListItem: FC<Props> = ({
  time,
  username,
  lastMessage,
  AvatarImage,
}) => {
  // TODO: update styles and content
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <AvatarImage />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack sx={styles.listUsername}>
              <Typography variant="h5">{username}</Typography>
              <Typography variant="body2" color="secondary.dark">
                {time}
              </Typography>
            </Stack>
          }
          secondary={lastMessage}
          sx={styles.listItem}
        />
      </ListItemButton>
    </ListItem>
  );
};
