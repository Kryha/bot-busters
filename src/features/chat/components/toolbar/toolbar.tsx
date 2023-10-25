import { type FC } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { text } from "@/assets/text";
import { styles } from "./styles";
import { ToolbarMenu } from "@/features/chat/components";

interface Props {
  anchorEl: HTMLElement | null;

  setToggle: () => void;
  setAnchorEl: (element: HTMLElement | null) => void;
}

export const ChatToolBar: FC<Props> = ({
  setToggle,
  anchorEl,
  setAnchorEl,
}) => {
  return (
    <AppBar position="fixed" sx={styles.appBar} elevation={0}>
      <Toolbar sx={styles.toolbar}>
        <Stack sx={styles.container}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={setToggle}
            sx={styles.iconButton}
          >
            <MenuIcon />
          </IconButton>
          <Avatar sx={styles.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="secondary.dark"
          >
            {text.general.appTitle}
          </Typography>
        </Stack>
        <Stack sx={styles.expandButton}>
          <ToolbarMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
