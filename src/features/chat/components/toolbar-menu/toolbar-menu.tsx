import { type FC, type MouseEvent } from "react";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Home from "@mui/icons-material/Home";
import NextPlan from "@mui/icons-material/NextPlan";

import { text } from "@/assets/text";
import { pages } from "@/utils/router";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: (element: HTMLElement | null) => void;
}

export const ToolbarMenu: FC<Props> = ({ anchorEl, setAnchorEl }) => {
  // TODO: update component

  const router = useRouter();

  const open = Boolean(anchorEl);
  const controls = open ? "toolbar-menu" : undefined;
  const expanded = open ? "true" : undefined;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: string) => {
    setAnchorEl(null);
    if (route) void router.push(route);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={controls}
        aria-haspopup="true"
        aria-expanded={expanded}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="toolbar-menu"
        open={open}
        onClose={() => handleClose()}
        onClick={() => handleClose()}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleClose(pages.home)}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          {text.general.home}
        </MenuItem>
        <MenuItem onClick={() => handleClose(pages.decision)}>
          <ListItemIcon>
            <NextPlan />
          </ListItemIcon>
          {text.general.decision}
        </MenuItem>
      </Menu>
    </>
  );
};
