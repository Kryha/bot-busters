import { DRAWER_WIDTH } from "@/constants";
import { type SxProps } from "@mui/material";

export const styles = {
  appBar: {
    backgroundColor: "secondary.light",
    width: { sm: `calc(100% - ${DRAWER_WIDTH})` },
    ml: { sm: DRAWER_WIDTH },
  },
  iconButton: { mr: 2, display: { sm: "none" } },
  avatar: {
    cursor: "pointer",
  },
  toolbar: { flexDirection: "row", justifyContent: "space-between" },
  expandButton: { flexDirection: "row", gap: 1 },
  container: { flexDirection: "row", gap: 1 } satisfies SxProps,
};
