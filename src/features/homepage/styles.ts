import { type SxProps } from "@mui/material";

export const styles = {
  textContainer: {
    pt: "170px",
    alignItems: "center",
  },
  description: {
    mt: 3,
    mb: 5,
    textAlign: "center",
  },
  startGameButton: {
    p: "23px 60px",
  },
  openDailyButton: {
    p: "12px 120px",
  },
  actions: {
    gap: 2,
    flexDirection: "column",
  },
  buttonText: { textTransform: "none" } satisfies SxProps,
};
