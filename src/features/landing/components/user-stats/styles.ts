import { type SxProps } from "@mui/material";

export const styles = {
  statsWrapper: {
    alignItems: "flex-end",
    pt: 3,
    pr: 3,
    width: "100vw",
    gap: 3,
  },
  statsContainer: {
    display: "flex",
    gap: 1,
  },
  stack: { gap: 3 },
  pointsWrapper: { flexDirection: "row", gap: 5 },
  pointsContainer: { alignItems: "center" } satisfies SxProps,
};
