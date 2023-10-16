import { type SxProps } from "@mui/material";

export const styles = {
  mainTableCell: {
    paddingBottom: 0,
    paddingTop: 0,
    borderBottom: "none",
  },
  box: { margin: 1 },
  tableCellHeading: {
    borderBottom: "0.5px solid",
    borderColor: "secondary.light",
    color: "primary.main",
  },
  tableCellRow: {
    borderBottom: "none",
    color: "secondary.main",
  } satisfies SxProps,
};
