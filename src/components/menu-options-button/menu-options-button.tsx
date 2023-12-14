import { styled } from "@mui/material/styles";
import { theme } from "~/styles/theme";
import { Button } from "@mui/base";
import React, { type FC } from "react";
import { SelectIcon } from "~/assets/icons/index.js";

interface Props extends React.ComponentProps<typeof Button> {
  text: string;
}

export const MenuOptionsButtonStyle = styled(Button)({
  background: "none",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "left",
  gap: 24,
  fontSize: theme.typography.h2.fontSize,
  lineHeight: theme.typography.h2.lineHeight,
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.h2.fontFamily,
  textTransform: "uppercase",
  "& > svg": {
    "& > path": {
      fill: theme.palette.common.black,
    },
  },
  "&:hover": {
    color: theme.palette.primary.main,
    "& > svg": {
      "& > path": {
        fill: theme.palette.primary.main,
      },
    },
  },
  "&:active": {
    color: theme.palette.primary.main,
    "& > svg": {
      "& > path": {
        fill: theme.palette.primary.main,
      },
    },
  },
});

export const MenuOptionsButton: FC<Props> = ({ text, ...props }) => {
  return (
    <MenuOptionsButtonStyle {...props}>
      <SelectIcon />
      {text}
    </MenuOptionsButtonStyle>
  );
};
