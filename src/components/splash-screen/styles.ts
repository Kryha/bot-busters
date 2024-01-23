import { type SxProps } from "@mui/material";

export const styles = {
  container: (backgroundColor?: string) => {
    return {
      position: "fixed",
      inset: 0,
      backgroundColor: backgroundColor,
      zIndex: 2,
      alignItems: "center",
      justifyContent: "center",
    } satisfies SxProps;
  },
};
