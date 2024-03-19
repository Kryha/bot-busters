import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  table: {
    mb: 5,
    textAlign: "center",
  },
  actions: {
    gap: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  connectWallet: {
    alignItems: "center",
    gap: 4,
    mb: 20,
  },
} satisfies SxStyleRecord;
