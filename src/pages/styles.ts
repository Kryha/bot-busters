import { type SxProps } from "@mui/material";

export const styles = {
  statsWrapper: {
    display: "flex",
    alignItems: "flex-end",
    pt: 3,
    pr: 3,
  },
  connectButton: {
    p: "0px 16px",
    borderRadius: 1,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    mt: "152px",
  },
  description: {
    mt: 3,
    mb: 5,
  },
  startGameButton: {
    width: "fit-content",
    p: "11px 60px",
    borderRadius: "4px",
    mb: "180px",
  } satisfies SxProps,
};
