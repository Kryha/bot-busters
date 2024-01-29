import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme";

export const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    mb: 10,
  },
  table: {
    minWidth: 650,
    maxWidth: 1200,
    borderCollapse: "separate",
    "& td, & th": {
      borderColor: theme.palette.divider,
      borderWidth: 2,
    },
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
    "@media (max-width:1100px)": {
      maxWidth: "170px",
    },
  } satisfies SxProps,

  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    "& .MuiTableCell-root": {
      pl: 0,
    },
  },
  payout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    p: "6px 12px",
    "& .MuiChip-label": {
      color: "common.white",
    },
  } satisfies SxProps,
};
