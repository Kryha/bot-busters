import { type SxProps } from "@mui/material";

export const styles = {
  listItem: {
    "& .MuiListItemText-primary": {
      color: "common.black",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .MuiListItemText-secondary": {
      color: "secondary.dark",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  listUsername: {
    flexDirection: "row",
    justifyContent: "space-between",
  } satisfies SxProps,
};
