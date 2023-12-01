import { type SxProps } from "@mui/material";

export const styles = {
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
