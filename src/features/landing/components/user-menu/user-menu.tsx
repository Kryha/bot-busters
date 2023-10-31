import EditIcon from "@mui/icons-material/Edit";
import { useState, type MouseEvent, type FC } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { text } from "@/assets/text";
import LogoutIcon from "@mui/icons-material/Logout";
import { styles } from "./styles";

interface Props {
  isMenuVisible: boolean;
  username: string;
}

export const UserMenu: FC<Props> = ({ isMenuVisible, username }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose} disableRipple>
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
