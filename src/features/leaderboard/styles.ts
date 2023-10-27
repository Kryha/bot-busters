import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    gap: 5,
    alignItems: "center",
    maxWidth: "100vw",
    overflowX: "hidden",
    "&. MuiTableContainer-root": {
      minWidth: 650,
      width: "51.6vw",
      maxWidth: "60vw",
    },
  },
  container: {
    mt: 2,
    gap: 2,
  },
  text: { textAlign: "center" } satisfies SxProps,
};
