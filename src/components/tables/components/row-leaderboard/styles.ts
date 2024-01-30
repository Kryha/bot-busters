import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";

export const styles = {
  tableRow: (isBlurred?: boolean) => {
    return {
      "&:last-child td, &:last-child th": { border: 0 },
      "& .MuiTableCell-root": { pl: 0 },
      filter: isBlurred ? "blur(2.5px)" : "none",
    };
  },
  container: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  },
  cell: {
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  ranking: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: theme.typography.h4.fontSize,
    textAlign: "end",
    color: theme.palette.primary.main,
    pr: "10px"
  } satisfies SxProps,
};
