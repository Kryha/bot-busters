import { type SxProps } from "@mui/material";
import { breakpoints } from "~/styles/index.js";

export const styles: Record<string, SxProps> = {
  wrapper: {
    alignItems: "center",
    width: "700px",
    [`@media (max-width: ${breakpoints.md}px)`]: {
      width: "100%",
    },
  },
  textWrapper: {
    flex: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 2,
    alignItems: "center",
  },
  button: {
    width: "100%",
    cursor: "pointer",
  },
  buttonContainer: {
    flex: 0,
    gap: 2,
    mt: 2,
    mb: 2,
    width: "100%",
  } satisfies SxProps,
};
