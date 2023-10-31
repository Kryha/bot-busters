import { type SxProps } from "@mui/material";

export const styles = {
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
    textAlign: "center",
  },
  startGameButton: {
    width: "fit-content",
    p: "11px 60px",
    borderRadius: "4px",
    mb: "180px",
  },
  buttonText: { textTransform: "none" },
  image: {
    position: "fixed",
    right: 0,
    bottom: 0,
    pr: 4,
    pb: 4,
    gap: 6,
    width: "18.8%",
  },
  text: { alignSelf: "flex-end", textAlign: "end" } satisfies SxProps,
};
