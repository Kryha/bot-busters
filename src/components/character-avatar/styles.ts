import { type MatchStage } from "~/types";
import { theme } from "~/styles/theme";

export const styles = {
  avatar: (stage?: MatchStage, isSelected?: boolean, isBot?: boolean) => {
    let fill = "transparent";

    if (stage === "voting") {
      fill = isSelected ? theme.palette.common.white : "transparent";
    } else if (stage === "results") {
      if (isSelected === false && isBot === false) {
        fill = "transparent";
      } else if (isSelected === true && isBot === false) {
        fill = theme.palette.error.main;
      } else if (isSelected === true && isBot === true) {
        fill = theme.palette.success.main;
      }
    }

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
