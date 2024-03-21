import { theme } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    mb: 10,
  },
  table: {
    minWidth: 750,
    width: "100vw",
    borderCollapse: "separate",
    "& td, & th": {
      borderColor: theme.palette.divider,
      borderWidth: 2,
      py: 1,
    },
  },
  tableContainer: { height: "100vh", overflowY: "hidden" },
  tableRow: {
    "td:first-child": { pl: 20 },
    "td:last-child": { pr: 20 },
    td: {
      pl: 0,
    },
  },
  achievementTableRow: (pointsEarned: boolean) => {
    return {
      "td:first-child": { pl: 20 },
      "td:last-child": { pr: 20 },
      td: {
        pl: 0,
        color: pointsEarned ? theme.palette.primary.main : "customGrey.main",
      },
    };
  },
};
