import { type SxProps } from "@mui/material";

export const styles = {
  paginationItem: {
    "& .MuiPaginationItem-icon": {
      color: "primary.main",
    },
  },
  pagination: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 5,
  } satisfies SxProps,
};
