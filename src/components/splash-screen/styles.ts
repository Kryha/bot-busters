import { type SxProps } from "@mui/material";
import { zIndex } from "~/styles/z-index.js";

export const styles = {
  container: (backgroundColor?: string) => {
    return {
      position: "fixed",
      inset: 0,
      height: "100%",
      width: "100%",
      backgroundColor: backgroundColor,
      zIndex: zIndex.front,
      alignItems: "center",
      justifyContent: "center",
    } satisfies SxProps;
  },
};
