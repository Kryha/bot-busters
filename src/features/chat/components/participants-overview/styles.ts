import { type SxProps } from "@mui/material";

export const styles = {
  wrapperInitial: {
    alignItems: "flex-start",
    width: 1,
    maxWidth: 326,
    pt: 3,
    pr: 3,
    justifyContent: "space-between",
  },
  wrapperDecision: {
    alignItems: "center",
    width: 1,
    maxWidth: 660,
    pt: 3,
    pr: 3,
    justifyContent: "space-between",
  },
  wrapperResults: {
    width: 1,
    maxWidth: 437,
    pt: 3,
    pr: 3,
    justifyContent: "space-between",
    paddingBottom: 3,
  },
  container: {
    gap: 3,
  },
  divider: {
    maxWidth: 437,
    width: 1,
  } satisfies SxProps,
};
