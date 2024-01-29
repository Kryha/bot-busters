import { type SxProps } from "@mui/material";

import { theme } from "~/styles/theme";

export const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    mb: 10,
  } satisfies SxProps,
  table: {
    minWidth: 650,
    maxWidth: 1200,
    borderCollapse: "separate",
    "& td, & th": {
      borderColor: theme.palette.divider,
      borderWidth: 2,
    },
  } satisfies SxProps,
  tableContainer: { height: "100vh", overflowY: "hidden" } satisfies SxProps,

  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  } satisfies SxProps,
};
