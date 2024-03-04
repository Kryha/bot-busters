import { styled } from "@mui/material/styles";
import { Button } from "@mui/base";
import { type FC } from "react";
import { BotBustersIcon } from "~/assets/icons/index.js";
import { theme } from "~/styles/theme.js";

interface Props extends React.ComponentProps<typeof Button> {
  text?: string;
}

export const LogoButtonStyle = styled(Button)({
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

export const LogoButton: FC<Props> = ({ ...props }) => {
  return (
    <LogoButtonStyle {...props}>
      <BotBustersIcon />
    </LogoButtonStyle>
  );
};
