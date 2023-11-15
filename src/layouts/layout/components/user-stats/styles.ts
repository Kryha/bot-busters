import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  statsWrapper: {
    justifyContent: "flex-end",
    pr: 3,
    gap: 3,
    flexDirection: "row",
    alignItems: "flex-start",
    mt: 2,
  } satisfies SxProps,
};
