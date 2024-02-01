import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  mainContainer: {
    alignItems: "center",
    gap: 2,
  },
  table: {
    mt: "120px",
    mb: 5,
    textAlign: "center",
  },
  actions: {
    gap: 2,
    flexDirection: "column",
    alignItems: "center",
  },
} satisfies SxStyleRecord;
