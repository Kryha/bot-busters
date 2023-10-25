import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100vh",
  },
  container: {
    justifyContent: "space-between",
    height: "62.4%",
    "@media (max-width:600px)": {
      pl: 4,
      pr: 4,
    },
  },
  progress: {
    gap: 10,
    alignItems: "center",
  },
  text: { alignItems: "center", mb: 10 } satisfies SxProps,
};
