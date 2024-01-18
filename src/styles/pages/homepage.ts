import { type SxProps } from "@mui/material";

export const styles = {
  textContainer: {
    alignItems: "center",
  },
  description: {
    mt: 3,
    mb: 5,
    textAlign: "center",
  },
  startGameButton: {
    width: "100%",
  },
  openDailyButton: {
    p: "12px 120px",
  },
  actions: {
    gap: 2,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttonText: { textTransform: "none" } satisfies SxProps,
};
