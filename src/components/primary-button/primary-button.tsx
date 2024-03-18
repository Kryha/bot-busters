import { type FC } from "react";
import { Button } from "@mui/base";
import { styled } from "@mui/material/styles";
import { SelectIcon } from "~/assets/icons/index.js";
import { theme } from "~/styles/theme.js";

interface Props extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

const PrimaryButtonStyle = styled(Button)({
  background: "none",
  border: `4px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
  outline: "none",
  flex: "1 1 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: 48,
  minWidth: "320px",
  fontSize: "24px",
  padding: "24px 24px",
  lineHeight: "unset",
  color: theme.palette.primary.main,
  fontFamily: theme.typography.h3.fontFamily,
  textTransform: "uppercase",
  "& > (first-child)": {
    flex: "1 1 auto",
  },
  "& > div > svg": {
    "& > path": {
      fill: theme.palette.primary.main,
      stroke: theme.palette.primary.main,
    },
  },
  "&:hover": {
    background: theme.palette.primary.main,
    color: theme.palette.common.black,
    "& > div > svg": {
      "& > path": {
        fill: theme.palette.common.black,
        stroke: theme.palette.common.black,
      },
    },
  },
  "&:active": {
    color: theme.palette.primary.main,
    "& > div > svg": {
      "& > path": {
        fill: theme.palette.primary.main,
        stroke: theme.palette.primary.main,
      },
    },
  },
  "&:disabled": {
    border: `4px solid ${theme.palette.customGrey.main}`,
    color: theme.palette.customGrey.main,
    cursor: "default",
    "& > div > svg": {
      "& > path": {
        fill: theme.palette.customGrey.main,
        stroke: theme.palette.customGrey.main,
      },
    },
    "&:hover": {
      background: "none",
    },
  },
});

export const PrimaryButton: FC<Props> = ({ children, ...props }) => {
  return (
    <PrimaryButtonStyle {...props}>
      <div style={{ flex: "1 1 auto" }}>{children}</div>
      <div style={{ flex: "0" }}>
        <SelectIcon />
      </div>
    </PrimaryButtonStyle>
  );
};
