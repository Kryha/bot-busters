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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { text } from "@/assets/text";
import { styles } from "./styles";

interface Props {
  setToggle: () => void;
}

export const ChatToolBar: FC<Props> = ({ setToggle }) => {
  return (
    <AppBar position="fixed" sx={styles.appBar}>
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
            {text.general.appBarTitle}
          </Typography>
        </Stack>
        <Stack sx={styles.expandButton}>
          <IconButton onClick={setToggle}>
            <ExpandMoreIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
