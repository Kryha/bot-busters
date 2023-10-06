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
  title: string;
  time: string;
  lastMessage?: string;
  AvatarImage: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

export const ChatListItem: FC<Props> = ({
  time,
  title,
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
            <Stack sx={styles.listTitle}>
              <Typography variant="h5">{title}</Typography>
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
