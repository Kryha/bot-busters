import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    display: "flex",
    width: "65vw",
    minHeight: "53px",
  } satisfies SxProps,
  transformPointToBullet: {
    width: "20px",
    transform: "scale(3) translate(-5px, 3.3px)",
  } satisfies SxProps,
  text: {
    lineHeight: "35px",
  } satisfies SxProps,
  childContainer: {
    pt: "8px",
  } satisfies SxProps,
};
