import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
    width: "51.6vw",
    maxWidth: "60vw",
    borderCollapse: "separate",
  },
  tableContainer: { height: "100vh", overflowY: "hidden" } satisfies SxProps,
};
