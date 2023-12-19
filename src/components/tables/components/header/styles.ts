import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme";

export const styles = {
  tableRow: {
    "& .MuiTableCell-root": { pl: 0 },
  } satisfies SxProps,
  tableHeader: {
    textAlign: "center",
    textTransform: "uppercase",
    color: theme.palette.secondary.main,
  },
};
