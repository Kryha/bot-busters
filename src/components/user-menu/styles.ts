import { type SxProps } from "@mui/material";
import { breakpoints, theme } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    pt: 3,
    pl: 3,
    pr: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 2,
      pr: 2,
      pt: 2,
    },
  },
  mainLogo: {
    "&:hover": {
      "& > svg": {
        "& > path": {
          fill: theme.palette.secondary.main,
        },
      },
    },
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      display: "none",
    },
  },
  iconButton: {
    backgroundColor: "darkBlue.main",
    borderRadius: 1,
    p: "12px 13px",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "darkBlue.main" },
  },
  userName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    gap: 2,
  },
  icon: { width: "0.8em", height: "0.8em" },
  button: { mr: 2 } satisfies SxProps,
};
