import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderBottom: `4px solid ${theme.palette.divider}`,
  } satisfies SxProps,
  chatTitle: {
    textTransform: "uppercase",
    textAlign: "center",
    pt: 4,
    pb: 4,
    pr: 2,
    pl: 2,
  },
  prompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    pr: 2,
    gap: 5,
    pl: 2,
  },
};