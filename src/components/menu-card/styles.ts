import { type SxProps } from "@mui/material";

export const styles = {
  userMenuWrapper: { flexDirection: "row", gap: 1, alignItems: "center" },
  buttonText: (isOpen: boolean) => {
    return {
      textTransform: "none",
      textDecoration: isOpen ? "underline" : "none",
    };
  },
  creditsWonChip: {
    mr: 1,
    "& .MuiChip-label": {
      color: "common.white",
    },
  },
  menuButton: { "& .MuiButton-endIcon": { ml: 0 } },
  menu: {
    mt: 2,
    "& .MuiPaper-root": {
      p: 3,
      borderRadius: 0,
      backgroundColor: "blueGrey.light",
      boxShadow: "none",
    },
    "& .MuiMenu-list": { p: 0 },
    "& .MuiMenuItem-root": {
      p: 0,
      cursor: "default",
      "&:hover": {
        backgroundColor: "blueGrey.light",
      },
    },
  },
  menuItem: {
    backgroundColor: "blueGrey.light",
    "&. MuiList-root-MuiMenu-list": { p: 80 },
  },
  menuItemWrapper: { gap: 3 },
  menuItemContainer: { gap: 2 },
  pointsContainer: { flexDirection: "row", gap: 5 },
  statsContainer: { flexDirection: "row", gap: 1 },
  chip: {
    height: "20px",
    padding: "0px 12px",
    borderRadius: "10px",
    "& .MuiChip-label": {
      color: "common.white",
      p: 0,
      fontSize: "10px",
    },
  },
  avatar: { backgroundColor: "blueGrey.main" } satisfies SxProps,
};
