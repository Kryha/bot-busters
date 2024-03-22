import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  container: {
    mx: "auto",
    alignSelf: "center",
  },
  errorMessage: {
    textAlign: "center",
    mb: "100px",
  },
  buttons: {
    flexDirection: "column",
    gap: 2,
  },
} satisfies SxStyleRecord;
