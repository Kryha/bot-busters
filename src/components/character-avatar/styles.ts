import { type MatchStage } from "~/types";
import { theme } from "~/styles/theme.js";

export const styles = {
  avatar: (stage: MatchStage, isSelected?: boolean, isBot?: boolean) => {
    const determineFill = (
      stage: MatchStage,
      isBot?: boolean,
      isSelected?: boolean,
    ) => {
      if (stage === "voting") {
        return isSelected ? theme.palette.common.white : "transparent";
      }

      if (stage === "results") {
        if (isSelected && isBot) {
          return theme.palette.success.main;
        }
        if (isSelected && !isBot) {
          return theme.palette.error.main;
        }
      }
      return "transparent";
    };

    const fill = determineFill(stage, isSelected, isBot);

    return {
      width: stage === "chat" ? "140px" : "150px",
      height: stage === "chat" ? "140px" : "150px",
      cursor: stage === "voting" ? "pointer" : "default",
      "& > svg": {
        width: "100%",
        height: "100%",
        preserveAspectRatio: "xMidYMid meet",
      },
      "&:hover": {
        "& > svg > g": {
          "& > g > path": {
            stroke: stage === "voting" ? theme.palette.common.white : fill,
          },
        },
      },
      "& > svg > g": {
        "& > path": {
          fill: fill,
        },
        "& > g > path": {
          stroke: fill,
        },
      },
    };
  },
};
