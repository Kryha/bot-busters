import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    flex: "1 1 auto",
    width: "100%",
    border: `4px solid ${theme.palette.customGrey.main}`,
  },
  heading: {
    textTransform: "uppercase",
    textAlign: "center",
    pt: 4,
    pb: 4,
    pr: 2,
    pl: 2,
    borderBottom: `4px solid ${theme.palette.customGrey.main}`,
  },
  achievements: {
    flex: "1 1 400px",
    overflowY: "scroll",
    pl: 2,
    pr: 2,
  },
  score: {
    textTransform: "uppercase",
    flex: "0",
    borderTop: `4px solid ${theme.palette.customGrey.main}`,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  points: {
    gap: 1,
  },
  point: {
    flexDirection: "row",
    justifyContent: "space-between",
  } satisfies SxProps,
};
