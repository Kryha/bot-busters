import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    width: "100%",
    mt: 1,
    pt: 1,
    pb: 1,
    backgroundColor: "customGrey.main",
    position: "relative",
  },
  progress: (progress: number, isFinalSeconds?: boolean) => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: `${progress}%`,
      height: "40px",
      backgroundColor: isFinalSeconds ? "red" : "customGrey.light",
      alignItems: "flex-end",
    };
  },
  countdownWrapper: { alignItems: "flex-start", position: "relative", pl: 1 },
  countdown: {
    mr: 1,
    fontSize: "24px",
    lineHeight: "24px",
  } satisfies SxProps,
};
