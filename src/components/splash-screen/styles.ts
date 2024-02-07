import { type SxProps } from "@mui/material";
import { zIndex } from "~/styles/z-index.js";

export const styles = {
  transitionLines: (backgroundColor?: string) => {
    return {
      position: "relative",
      "& > div > svg": {
        backgroundColor: backgroundColor,
        zIndex: zIndex.back,
      },
    } satisfies SxProps;
  },
  container: (backgroundColor?: string) => {
    return {
      position: "fixed",
      inset: 0,
      backgroundColor: backgroundColor,
      zIndex: zIndex.front,
      alignItems: "center",
      justifyContent: "center",
    } satisfies SxProps;
  },
};
