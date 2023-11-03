import { type SxProps } from "@mui/material";

export const styles = {
  list: (isResults: boolean) => {
    return {
      gap: isResults ? 2 : 5,
      flexDirection: "column",
    };
  },
  container: {
    gap: 4,
  } satisfies SxProps,
};
