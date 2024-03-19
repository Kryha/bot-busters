import { theme } from "~/styles/theme";
import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  tableRow: {
    "& .MuiTableCell-root": { pl: 0, verticalAlign: "bottom" },
    "th:first-child ": {
      pl: 6,
      textAlign: "left",
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
