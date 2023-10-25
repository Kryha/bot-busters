import { type FC } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import { type ContactListData } from "@/types";
import { formatDate } from "@/utils/date";

interface Props {
  contactList: ContactListData;
}

export const ChatListItem: FC<Props> = ({ contactList }) => {
  // TODO: update styles and content
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar src={contactList.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack sx={styles.listUsername}>
              <Typography variant="h5" color="secondary.dark">
                {contactList.username}
              </Typography>
              <Typography variant="body2" color="secondary.dark">
                {formatDate(contactList.time)}
              </Typography>
            </Stack>
          }
          secondary={contactList.lastMessage}
          sx={styles.listItem}
        />
      </ListItemButton>
    </ListItem>
  );
};
