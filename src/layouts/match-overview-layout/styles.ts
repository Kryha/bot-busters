import { type SxProps } from "@mui/material";

export const styles = {
  chat: {
    alignItems: "flex-start",
    width: 1,
    maxWidth: 326,
    pt: 3,
    pr: 3,
    justifyContent: "space-between",
  },
  voting: {
    alignItems: "center",
    width: 1,
    maxWidth: 660,
    pt: 3,
    pr: 3,
    justifyContent: "space-between",
  },
  results: {
    width: 1,
    maxWidth: 437,
    pt: 3,
    pr: 3,
    justifyContent: "space-between",
    paddingBottom: 3,
  } satisfies SxProps,
};
