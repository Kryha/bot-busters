import { type SxProps } from "@mui/material";

import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies SxProps,
  largeNumber: {
    transform: "translate(-30px, -27px)",
    color: theme.palette.secondary.main,
  },
  title: {
    color: theme.palette.secondary.main,
  }
};
