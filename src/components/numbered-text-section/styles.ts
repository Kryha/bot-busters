import { type SxProps } from "@mui/material";

import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    pb: "100px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies SxProps,
  number: {
    transform: "translate(-52px, -35px)",
    color: theme.palette.secondary.main,
    width: "63px",
    fontSize: "80px",
  },
  title: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
    transform: "translateX(-30px)",
    mb: "-30px",
  },
};
