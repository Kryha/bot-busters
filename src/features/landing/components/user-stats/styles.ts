import { type SxProps } from "@mui/material";

export const styles = {
  statsWrapper: {
    justifyContent: "flex-end",
    pr: 3,
    width: "100vw",
    gap: 3,
    flexDirection: "row",
    alignItems: "flex-start",
    mt: 2,
  },
  statsContainer: {
    display: "flex",
    gap: 1,
  },
  stack: { gap: 3 },
  pointsWrapper: { flexDirection: "row", gap: 5 },
  pointsContainer: { alignItems: "center" } satisfies SxProps,
};
