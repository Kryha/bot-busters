import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    flexDirection: "row",
    gap: 1,
  },
  playerHeading: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  playerSubHeading: {
    textAlign: "center",
  },
  timeSection: {
    gap: 0.5,
    justifyContent: "center",
    alignItems: "center",
  } satisfies SxProps,
};
