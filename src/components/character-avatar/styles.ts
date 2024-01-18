import { type MatchStage } from "~/types/index.js";
import { theme } from "~/styles/theme.js";

export const styles = {
  avatar: (stage: MatchStage, isSelected?: boolean, isBot?: boolean) => {
    const determineBorderFill = () => {
      if (isSelected) {
        if (stage === "voting") {
          return theme.palette.common.white;
        } else if (stage === "results") {
          if (isBot) {
            return theme.palette.success.main;
          } else {
            return theme.palette.error.main;
          }
        }
      }

      return "transparent";
    };

    const fill = determineBorderFill();

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
