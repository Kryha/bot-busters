import { theme } from "~/styles/theme.js";
import { type SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderBottom: `4px solid ${theme.palette.divider}`,
  },

  chatTitle: {
    textTransform: "uppercase",
    textAlign: "center",
    pt: 4,
    pb: 4,
    pr: 2,
    pl: 2,
  },

  prompt: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    lineHeight: "20px",
    p: 2,
    gap: 5,
  },
} satisfies SxStyleRecord;
