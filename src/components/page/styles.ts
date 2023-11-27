import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    alignItems: "center",
    justifyContent: "start",
    minHeight: "100vh",
    "@media (max-width:820px)": {
      minHeight: "100dvh",
    },
    overflow: "scroll",
  } satisfies SxProps,
};
