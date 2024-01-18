import type { SxStyleRecord } from "~/types/sx-style-record";

export const styles = {
  container: {
    display: "flex",
    width: "65vw",
    minHeight: "53px",
  },
  transformPointToBullet: {
    width: "20px",
    transform: "scale(3) translate(-5px, 3.3px)",
  },
  text: {
    lineHeight: "35px",
  },
  childContainer: {
    pt: "8px",
  },
} satisfies SxStyleRecord;
