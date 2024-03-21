import { styled } from "@mui/material/styles";
import { theme } from "~/styles/theme.js";
import { Button } from "@mui/base";
import { type FC } from "react";
import { CloseIcon } from "~/assets/icons/index.js";
import { text } from "~/assets/text/index.js";

interface Props extends React.ComponentProps<typeof Button> {
  text?: string;
}

export const MenuButtonStyle = styled(Button)({
  background: "none",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textAlign: "left",
  padding: "0 !important",
  fontSize: theme.typography.h3.fontSize,
  lineHeight: theme.typography.h3.lineHeight,
  color: theme.palette.primary.main,
  fontFamily: theme.typography.h3.fontFamily,
  textTransform: "uppercase",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
});

export const NavbarMenuButtonStyle = styled(MenuButtonStyle)({
  color: theme.palette.secondary.main,
  "& > svg": {
    "& > path": {
      fill: theme.palette.secondary.main,
      transform: "scale(0.67) translate(11px, 5px)",
    },
  },
  "&:hover": {
    color: theme.palette.secondary.main,
  },
  "&:active": {
    color: theme.palette.secondary.main,
    "& > svg": {
      "& > path": {
        fill: theme.palette.secondary.main,
      },
    },
  },
});

export const MenuButton: FC<Props> = ({ ...props }) => {
  return <MenuButtonStyle {...props}>{text.general.menu}</MenuButtonStyle>;
};

export const NavbarMenuButton: FC<Props> = ({ ...props }) => {
  return (
    <NavbarMenuButtonStyle {...props}>
      {text.general.menu}
      <CloseIcon />
    </NavbarMenuButtonStyle>
  );
};

export const ExitLobbyButton: FC<Props> = ({ ...props }) => {
  return <MenuButtonStyle {...props}>{text.general.quitLobby}</MenuButtonStyle>;
};
