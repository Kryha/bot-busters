import { type MatchStage } from "~/types/index.js";
import { breakpoints, theme } from "~/styles/theme.js";

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
      width: stage !== "chat" ? "200px" : "140px",
      height: stage !== "chat" ? "200px" : "140px",
      [`@media (max-width: ${breakpoints.md}px)`]: {
        width: "140px",
        height: "140px",
      },
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
          stroke: fill,
        },
        "& > g > path": {
          stroke: fill,
        },
      },
    };
  },
  animation: (stage: MatchStage, isSelected?: boolean, isBot?: boolean) => {
    const determineBorderFill = () => {
      if (isSelected) {
        if (isBot) {
          return `url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 264 284' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 249.872L3 280.342L33 280.342' stroke='%235CFF00' stroke-width='4'/%3E%3Cpath d='M261 249.872L261 280.342L231 280.342' stroke='%235CFF00' stroke-width='4'/%3E%3Cpath d='M3 33.5952L3 3.125L33 3.125' stroke='%235CFF00' stroke-width='4'/%3E%3Cpath d='M261 33.5952L261 3.125L231 3.125' stroke='%235CFF00' stroke-width='4'/%3E%3C/svg%3E") 4`;
        } else {
          return `url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 264 284' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 249.872L3 280.342L33 280.342' stroke='%23FF4823' stroke-width='4'/%3E%3Cpath d='M261 249.872L261 280.342L231 280.342' stroke='%23FF4823' stroke-width='4'/%3E%3Cpath d='M3 33.5952L3 3.125L33 3.125' stroke='%23FF4823' stroke-width='4'/%3E%3Cpath d='M261 33.5952L261 3.125L231 3.125' stroke='%23FF4823' stroke-width='4'/%3E%3C/svg%3E") 4`;
        }
      }
      return "6px solid black";
    };
    const determineBorderArrow = () => {
      if (isSelected) {
        if (isBot) {
          return `url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 24 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.0767 9.82811L19.0767 4.91406L14.3076 4.91406L14.3076 9.82811L19.0767 9.82811Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M23.8457 4.91405L23.8457 0L19.0767 -2.08461e-07L19.0767 4.91405L23.8457 4.91405Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M14.3076 14.7422L14.3076 9.82812L9.53857 9.82812L9.53857 14.7422L14.3076 14.7422Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M9.53857 9.82811L9.53857 4.91406L4.76954 4.91406L4.76954 9.82811L9.53857 9.82811Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M9.53857 4.91405L9.53857 0L4.76954 -2.08461e-07L4.76954 4.91405L9.53857 4.91405Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M14.3076 4.91405L14.3076 0L9.53857 -2.08461e-07L9.53857 4.91405L14.3076 4.91405Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M19.0767 4.91405L19.0767 0L14.3076 -2.08461e-07L14.3076 4.91405L19.0767 4.91405Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M4.76904 4.91405L4.76904 0L0 -2.08461e-07L-2.148e-07 4.91405L4.76904 4.91405Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3Cpath d='M14.3076 9.82811L14.3076 4.91406L9.53857 4.91406L9.53857 9.82811L14.3076 9.82811Z' fill='%235CFF00' stroke='%235CFF00'/%3E%3C/svg%3E%0A")`;
        } else {
          return `url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 24 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.0767 9.82811L19.0767 4.91406L14.3076 4.91406L14.3076 9.82811L19.0767 9.82811Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M23.8457 4.91405L23.8457 0L19.0767 -2.08461e-07L19.0767 4.91405L23.8457 4.91405Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M14.3076 14.7422L14.3076 9.82812L9.53857 9.82812L9.53857 14.7422L14.3076 14.7422Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M9.53857 9.82811L9.53857 4.91406L4.76954 4.91406L4.76954 9.82811L9.53857 9.82811Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M9.53857 4.91405L9.53857 0L4.76954 -2.08461e-07L4.76954 4.91405L9.53857 4.91405Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M14.3076 4.91405L14.3076 0L9.53857 -2.08461e-07L9.53857 4.91405L14.3076 4.91405Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M19.0767 4.91405L19.0767 0L14.3076 -2.08461e-07L14.3076 4.91405L19.0767 4.91405Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M4.76904 4.91405L4.76904 0L0 -2.08461e-07L-2.148e-07 4.91405L4.76904 4.91405Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3Cpath d='M14.3076 9.82811L14.3076 4.91406L9.53857 4.91406L9.53857 9.82811L14.3076 9.82811Z' fill='%23FF4823' stroke='%23FF4823'/%3E%3C/svg%3E%0A")`;
        }
      }
    };

    const fill = determineBorderFill();

    return {
      width: stage !== "chat" ? "200px" : "140px",
      height: stage !== "chat" ? "200px" : "140px",
      [`@media (max-width: ${breakpoints.md}px)`]: {
        width: "140px",
        height: "140px",
      },
      cursor: "default",
      "& > div": {
        border: "6px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        borderImage: fill,
        "&:before": {
          content: "''",
          backgroundImage: determineBorderArrow(),
          position: "absolute",
          top: "27px",
          zIndex: 1,
          width: "16px",
          height: "10px",
        },
      },
      "& > div > svg": {
        width: "100%",
        height: "100%",
      },
    };
  },
};
