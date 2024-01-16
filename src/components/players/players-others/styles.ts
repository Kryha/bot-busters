import { type SxProps } from "@mui/material";
import { breakpoints } from "~/styles/theme.js";

export const styles = {
  list: (isResults: boolean) => {
    return {
      justifyContent: "center",
      gap: isResults ? 2 : 2,
      flexDirection: isResults ? "row" : "column",
      pr: 2,
      pl: 2,
      [`@media (max-width: ${breakpoints.md}px)`]: {
        flexDirection: "row",
      },
    };
  },
  container: {
    gap: 4,
  },
  playerHeading: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  playerSubHeading: {
    textAlign: "center",
  },
  timeSection: {
    pr: 2,
    pl: 2,
    gap: 0.5,
    justifyContent: "center",
    alignItems: "center",
  } satisfies SxProps,
  button: {
    mt: 2,
  },
  //TODO: Might join these two styles in future
  voting: {
    mt: 4,
    pr: 2,
    pl: 2,
    gap: 4,
  },
  results: {
    mt: 4,
    pr: 2,
    pl: 2,
    gap: 4,
  },
};
