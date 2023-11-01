import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: (isFinished?: boolean) => {
    return {
      alignItems: isFinished ? "center" : "flex-start",
      width: 1,
      maxWidth: isFinished ? 660 : 302,
      pt: 3,
      pr: 3,
    };
  },
  container: {
    gap: 3,
  },
  divider: {
    maxWidth: 437,
    width: 1,
  } satisfies SxProps,
};
