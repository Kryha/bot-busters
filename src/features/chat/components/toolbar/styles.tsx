import { type SxProps } from "@mui/material";

export const styles = {
  appBar: {
    backgroundColor: "secondary.light",
  },
  iconButton: { mr: 2, display: { sm: "none" } },
  avatar: {
    cursor: "pointer",
  },
  toolbar: { flexDirection: "row", justifyContent: "space-between" },
  expandButton: { flexDirection: "row", gap: 1 },
  container: { flexDirection: "row", gap: 1 } satisfies SxProps,
};
