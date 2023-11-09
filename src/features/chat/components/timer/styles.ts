import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: { width: "100%" },
  progress: (progress: number, isFinalSeconds?: boolean) => {
    const minWidth = 2;
    const calculatedWidth =
      progress > 0 ? Math.min(Math.max(progress, minWidth), 100) : 0;
    return {
      width: `${calculatedWidth}%`,
      height: "16px",
      backgroundColor: isFinalSeconds ? "red" : "customGrey.main",
      alignItems: "flex-end",
    };
  },
  countdownWrapper: { alignItems: "center" },
  countdown: { mr: 1, lineHeight: "16px" } satisfies SxProps,
};
