import type { SxStyleRecord } from "~/types/sx-style-record.js";
import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    mb: "80px",
    pt: "80px",
  },
  dateSwitchSelected: {
    cursor: "pointer",
    userSelect: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.orange.main,
    },
  },
  dateSwitchUnselected: {
    cursor: "pointer",
    userSelect: "none",
    color: theme.palette.disabled.main,
    "&:hover": {
      color: theme.palette.orange.main,
    },
  },
} satisfies SxStyleRecord;
