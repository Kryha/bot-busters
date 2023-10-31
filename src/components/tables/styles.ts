import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
    width: "51.6vw",
    maxWidth: "60vw",
    borderCollapse: "separate",
  },
  tableContainer: { height: "100vh", overflowY: "hidden" },
  addScoreContainer: (isGamePlayed: boolean) => {
    return {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isGamePlayed ? "#EEE" : "transparent",
      position: "relative",
    };
  },
  addScoreWrapper: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    left: 0,
    gap: 2,
  },
  addScoreBody: (isVisible?: boolean) => {
    return {
      opacity: isVisible ? 0 : 1,
    };
  },
  countdown: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    pr: 3,
    display: "flex",
    alignItems: "center",
  } satisfies SxProps,
};
