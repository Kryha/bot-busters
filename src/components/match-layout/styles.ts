import { type SxProps } from "@mui/material";
import { breakpoints } from "~/styles/theme.js";

export const styles = {
  container: {
    position: "relative",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1800px !important",
    pb: "0px !important",
    pl: "0px !important",
    pr: "0px !important",
    [`@media (max-width: ${breakpoints.md}px)`]: {
      gap: 4,
      flexDirection: "column",
    },
  } satisfies SxProps,
};
