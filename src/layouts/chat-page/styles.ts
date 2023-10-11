import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    minHeight: "100vh",
    "@media (max-width:820px)": {
      minHeight: "100dvh",
    },
    overflow: "scroll",
  } satisfies SxProps,
};
