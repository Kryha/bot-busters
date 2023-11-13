import { type SxProps } from "@mui/material";

export const styles = {
  dialog: {
    "& .MuiDialog-paper": {
      backgroundColor: "customGrey.light",
      justifyContent: "space-between",
    },
  },
  buttonWrapper: {
    alignItems: "flex-end",
    pt: 3,
    pr: 3,
    width: "100vw",
  },
  button: {
    p: "4px 16px",
  },
  menuButtonContainer: { display: "flex", alignItems: "center" },
  startGame: { mb: 12 },
  menuButton: { width: "fit-content" },
  footer: {
    pl: 3,
    pr: 3,
    pb: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  group: { flexDirection: "row", gap: 5 } satisfies SxProps,
};
