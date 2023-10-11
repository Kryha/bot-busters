import { Avatar, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCommentIcon from "@mui/icons-material/AddComment";

import { styles } from "./styles";

export const ChatListToolbar = () => {
  // TODO: update styles and content
  return (
    <Toolbar sx={styles.toolbar}>
      <Avatar sx={styles.avatar}>
        <AccountCircleIcon />
      </Avatar>
      <IconButton>
        <AddCommentIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Toolbar>
  );
};
