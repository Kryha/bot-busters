import { styled } from "@mui/material/styles";
import { theme } from "~/styles/theme";
import { Button } from "@mui/base";
import React, { type FC } from "react";
import { CloseIcon } from "~/assets/icons";
import { text } from "~/assets/text";

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
  textAlign: "left",
  padding: "0 !important",
  fontSize: theme.typography.h3.fontSize,
  lineHeight: theme.typography.h3.lineHeight,
  color: theme.palette.primary.main,
  fontFamily: theme.typography.h3.fontFamily,
  textTransform: "uppercase",
  "& > svg": {
    "& > path": {
      fill: theme.palette.common.black,
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
  return (
    <MenuButtonStyle {...props}>
      {text.general.menu}
      <CloseIcon />
    </MenuButtonStyle>
  );
};
