import type { SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    minHeight: "50px",
    pb: "-30px",
    ml: "-5px",
  },
  transformPointToBullet: {
    width: "20px",
    transform: "scale(3) translate(-3px, -5px)",
  },
  text: {
    lineHeight: "35px",
  },
  childContainer: {
    pt: "8px",
  },
} satisfies SxStyleRecord;
