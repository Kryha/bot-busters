import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";

export const styles = {
  tableRow: (isBlurred?: boolean) => {
    return {
      "&:last-child td, &:last-child th": { border: 0 },
      "& .MuiTableCell-root": { pl: 0 },
      "td:first-child": { pl: 20, pr: 5 },
      "td:last-child": { pr: 20 },
      td: {
        pl: 0,
      },
      filter: isBlurred ? "blur(2.5px)" : "none",
    };
  },
  container: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  },
  cell: {
    color: theme.palette.primary.main,
  },
  userCell: {
    position: "sticky",
    color: theme.palette.common.white,
  },
  rank: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  ranking: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: theme.typography.h4.fontSize,
    textAlign: "end",
    color: theme.palette.primary.main,
  } satisfies SxProps,
};
