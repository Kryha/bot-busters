import { type SxProps } from "@mui/material";

import { breakpoints } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100vh",
  } satisfies SxProps,
  container: {
    justifyContent: "space-between",
    height: "62.4%",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 4,
      pr: 4,
    },
  } satisfies SxProps,
  progress: {
    gap: 10,
    alignItems: "center",
  } satisfies SxProps,
  text: { alignItems: "center", mb: 10 } satisfies SxProps,
};
