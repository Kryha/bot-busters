import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    width: "65vw",
    overflow: "wrap",
  } satisfies SxProps,
  transformPointToBullet: {
    width: "20px",
    transform: "scale(3) translate(-5px, 3.3px)",
  } satisfies SxProps,
  text: {
    lineHeight: "35px",
  } satisfies SxProps,
};
