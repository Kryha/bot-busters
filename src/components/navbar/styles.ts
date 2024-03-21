import { type SxProps } from "@mui/material";

import { breakpoints, theme } from "~/styles/theme.js";
import { zIndex } from "~/styles/z-index.js";

export const styles = {
  container: {
    position: "relative",
    backgroundColor: "transparent",
    zIndex: zIndex.front,
    flex: "0 1 auto",
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
    position: "relative",
    pt: 1,
    pb: 1,
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      "& > svg": {
        "& > path": {
          fill: theme.palette.secondary.main,
        },
      },
    },
    "&:active": {
      backgroundColor: "transparent",
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
    height: 40,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
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
    zIndex: zIndex.front,
    transform: " skew(-15deg)",
    backgroundColor: "common.black",
    "& > button": {
      transform: "skew(15deg)",
    },
    fontStyle: "italic",
    width: 200,
    height: 40,
    gap: 3,
    justifyContent: "center",
  } satisfies SxProps,
  navbarStart: {
    fontStyle: "italic",
    width: 300,
    justifyContent: "flex-start",
  } satisfies SxProps,
  lobby: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 3,
    mr: 2,
  },
};
