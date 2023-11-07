import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: { width: "100%" },
  progress: (progress: number, isFinalSeconds?: boolean) => {
    return {
      width: `${progress}%`,
      height: "16px",
      backgroundColor: isFinalSeconds ? "red" : "customGrey.main",
      alignItems: "flex-end",
    };
  },
  countdownWrapper: { alignItems: "center" },
  countdown: { mr: 1, lineHeight: "16px" } satisfies SxProps,
};
