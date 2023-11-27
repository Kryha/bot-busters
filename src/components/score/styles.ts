import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    width: 1,
    gap: 3,
  },
  score: {
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
