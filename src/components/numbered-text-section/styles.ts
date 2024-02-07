import { theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    pb: "60px",
    transform: "translateX(50px)",
  },
  column: {
    transform: "translateX(-40px)",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  number: {
    transform: "translate(-90px, -35px)",
    color: theme.palette.secondary.main,
    minWidth: "55px",
    fontSize: "80px",
    justifySelf: "end",
  },
  title: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
    transform: "translateX(-20px)",
    mb: "10px",
  },
} satisfies SxStyleRecord;
