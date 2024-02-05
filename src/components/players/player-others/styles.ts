import { type SxProps } from "@mui/material";
import { breakpoints } from "~/styles/theme.js";

export const styles = {
  list: (isResults: boolean) => {
    return {
      justifyContent: "center",
      gap: 2,
      flexDirection: isResults ? "row" : "column",
      [`@media (max-width: ${breakpoints.md}px)`]: {
        flexDirection: "row",
        mt: 10,
      },
    };
  },
  container: {
    gap: 4,
    pr: 2,
    [`@media (max-width: ${breakpoints.md}px)`]: {
      pr: 0,
    },
  },
  playerHeading: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  playerSubHeading: {
    textAlign: "center",
  },
  playerDisabledSubHeading: {
    textAlign: "center",
    textColor: "red",
  } satisfies SxProps,
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
