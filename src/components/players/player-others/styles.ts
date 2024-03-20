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
      width: stage === "chat" ? "auto" : "auto",
    };
  },
  list: (stage: MatchStage) => {
    return {
      width: stage === "chat" ? "auto" : "100%",
      justifyContent: stage === "results" ? "flex-start" : "center",
      mt: stage === "chat" ? 0 : 2,
      mb: stage === "chat" ? 0 : 2,
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
    px: 2,
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
    my: 3,
    px: 2,
    gap: 4,
  },
  results: {
    mt: 3,
    px: 2,
    gap: 4,
  },
  loading: {
    mr: 4,
    fontSize: "16px",
    fontFamily: theme.typography.body1.fontFamily,
    "@keyframes dots": {
      "0%, 20%": {
        color: "rgba(0,0,0,0)",
        textShadow: ".25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0)",
      },
      "40%": {
        color: "black ",
        textShadow: ".25em 0 0 rgba(0,0,0,0),.5em 0 0 rgba(0,0,0,0)",
      },
      "60%": {
        color: "white ",
        textShadow: ".25em 0 0 black, .5em 0 0 black",
      },
      "80%, 100%": {
        color: "white ",
        textShadow: ".25em 0 0 white, .5em 0 0 white",
      },
    },
    "&:after": {
      content: "'.'",
      animation: "dots 1s steps(5, end) infinite",
    },
  },
};
