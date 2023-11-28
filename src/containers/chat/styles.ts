import { type SxProps } from "@mui/material";

export const styles = {
  section: (isDisabled: boolean) => {
    return {
      height: "100vh",
      backgroundColor: "grey.50",
      borderRadius: "10px",
      overflow: "hidden",
      flexGrow: 1,
      maxWidth: !isDisabled ? "1100px" : undefined,
    } satisfies SxProps;
  },
};
