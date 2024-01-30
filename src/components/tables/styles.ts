import { theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    mb: 10,
  },
  table: {
    minWidth: 650,
    maxWidth: 1080,
    width: "100vw",
    borderCollapse: "separate",
    "& td, & th": {
      borderColor: theme.palette.divider,
      borderWidth: 2,
    },
  },
  tableContainer: { height: "100vh", overflowY: "hidden" },

  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
} satisfies SxStyleRecord;
