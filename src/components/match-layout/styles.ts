import { type SxProps } from "@mui/material";
import { breakpoints } from "~/styles/theme.js";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "calc(100vh - 67px)",
    pl: 2,
    pr: 2,
    flex: "1 1 auto",
    [`@media (max-width: ${breakpoints.md}px)`]: {
      gap: 4,
      flexDirection: "column",
    },
  } satisfies SxProps,
};
