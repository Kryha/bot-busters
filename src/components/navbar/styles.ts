import { type SxProps } from "@mui/material";

import { breakpoints, theme } from "~/styles/theme.js";

export const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  statsWrapper: {
    justifyContent: "flex-end",
    pr: 3,
    gap: 3,
    flexDirection: "row",
    alignItems: "flex-start",
    mt: 2,
  } satisfies SxProps,
  wrapper: {
    pt: 1,
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
    transform: "scale(0.7) translateY(6px)",
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
  userIcon: {
    transform: "scale(0.7)",
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
    gap: 1,
  } satisfies SxProps,
  userNameText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies SxProps,
  icon: { width: "0.8em", height: "0.8em" },
  button: {
    mr: 2,
    fontStyle: "italic",
   } satisfies SxProps,
  navbarEnd: {
    fontStyle: "italic",
    width: 300,
    justifyContent: "flex-end",
  } satisfies SxProps,
  navbarStart: {
    fontStyle: "italic",
    width: 300,
    justifyContent: "flex-start",
  } satisfies SxProps,
};
