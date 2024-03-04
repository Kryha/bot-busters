import { theme } from "~/styles/theme";
import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  tableRow: {
    "& .MuiTableCell-root": { pl: 0 },
  },
  tableHeader: {
    textAlign: "center",
    textTransform: "uppercase",
    color: theme.palette.secondary.main,
  },
  busterCell: {
    textAlign: "center",
  },
} satisfies SxStyleRecord;
