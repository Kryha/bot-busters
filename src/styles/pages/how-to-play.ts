import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  container: {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "start",
  },
  text: {
    overflow: "wrap",
    textAlign: "start",
  },
  section: {
    pt: "70px",
    pb: "100px",
  },
  heading: {
    textTransform: "uppercase",
    textAlign: "center",
    textWrap: "nowrap",
    maxWidth: "100vw"
  },
} satisfies SxStyleRecord;
