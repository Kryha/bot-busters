import { breakpoints, theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record";

export const styles = {
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100vh",
  },
  container: {
    justifyContent: "space-between",
    height: "62.4%",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 4,
      pr: 4,
    },
  },
  progress: {
    gap: 10,
    alignItems: "center",
  },
  text: { alignItems: "center", mb: 10 },
  textOrange: {
    width: "50vw",
    textAlign: "center",
    lineHeight: "24px",
    alignSelf: "center",
    color: theme.palette.secondary.main,
    mt: "-40px",
    mb: "30px",
  },
  textWhite: {
    width: "50vw",
    textAlign: "center",
    lineHeight: "24px",
    alignSelf: "center",
    mt: "-20px",
  },
} satisfies SxStyleRecord;
