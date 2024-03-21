import { theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  tableRow: {
    "& .MuiTableCell-root": { pl: 0, verticalAlign: "bottom" },
    "th:first-child ": {
      pl: 20,
      textAlign: "left",
    },
    "th:last-child ": {
      pr: 20,
    },
  },
  tableHeader: {
    textTransform: "uppercase",
    color: theme.palette.secondary.main,
  },
  busterCell: {
    textAlign: "center",
  },
} satisfies SxStyleRecord;
