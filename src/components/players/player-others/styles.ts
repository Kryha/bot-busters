import { type SxProps } from "@mui/material";
import { breakpoints, theme } from "~/styles/theme.js";
import { type MatchStage } from "~/types/index.js";

export const styles = {
  container: (stage: MatchStage) => {
    return {
      pr: stage === "chat" ? 2 : 3,
      [`@media (max-width: ${breakpoints.md}px)`]: {
        pr: 0,
      },
      width: stage === "chat" ? "auto" : "50%",
    };
  },
  list: (stage: MatchStage) => {
    return {
      width: stage === "chat" ? "auto" : "850px",
      justifyContent: "center",
      mt: 2,
      mb: 2,
      flexDirection: stage === "chat" ? "column" : "row",
      [`@media (max-width: ${breakpoints.md}px)`]: {
        flexDirection: "row",
        mt: 10,
      },
      gap: 1,
    };
  },
  playerHeading: {
    fontSize: "5.5rem",
    textAlign: "center",
    textTransform: "uppercase",
  },
  playerSubHeading: (isVotedEnabled: boolean) => {
    return {
      textAlign: "center",
      color: isVotedEnabled
        ? theme.palette.common.white
        : theme.palette.error.main,
    };
  },
  timeSection: {
    pr: 2,
    pl: 2,
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
    mb: 2,
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
    mb: 3,
  },
  results: {
    mt: 4,
    pr: 2,
    pl: 2,
    gap: 4,
  },
};
