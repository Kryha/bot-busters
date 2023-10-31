import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { type MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, type MouseEvent } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Avatar, Stack, Typography } from "@mui/material";
import { text } from "@/assets/text";
import { leaderboardData } from "@/constants";
import { ThemeProvider } from "@/features/mui";
import LogoutIcon from "@mui/icons-material/Logout";

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack sx={{ flexDirection: "row", gap: 1 }}>
      <Avatar alt="avatar" sx={{ backgroundColor: "blueGrey.main" }}>
        {text.leaderboard.avatarEmoji}
      </Avatar>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
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
          sx={{ textTransform: "none" }}
          color="blueGrey.main"
        >
          {leaderboardData[2]?.username}
        </Typography>
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <LogoutIcon />
          Logout
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
      </Menu>
    </Stack>
  );
};
