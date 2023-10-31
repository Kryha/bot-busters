/* eslint-disable @typescript-eslint/unbound-method */
import { useState, type MouseEvent, type FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

import { text } from "@/assets/text";
import LogoutIcon from "@mui/icons-material/Logout";
import { styles } from "./styles";

interface Props {
  isMenuVisible: boolean;
  username: string;
}

export const UserMenu: FC<Props> = ({ isMenuVisible, username }) => {
  // TODO: implement new version
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { disconnect } = useWallet();

  const open = !!anchorEl;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await signOut();
    await disconnect();
    handleClose();
  };

  if (!isMenuVisible) return;

  return (
    <Stack sx={styles.userMenuWrapper}>
      <Avatar alt="avatar" sx={styles.avatar}>
        {text.leaderboard.avatarEmoji}
      </Avatar>
      <Button
        id="button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        color="blueGrey"
      >
        <Typography
          variant="body1"
          sx={styles.buttonText}
          color="blueGrey.main"
        >
          {username}
        </Typography>
      </Button>
      <Menu
        id="menu"
        MenuListProps={{
          "aria-labelledby": "button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => void logout()} disableRipple>
          <LogoutIcon />
          {text.landing.logout}
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          {text.landing.edit}
        </MenuItem>
      </Menu>
    </Stack>
  );
};
