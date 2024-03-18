import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";
import { type MatchStage } from "~/types/index.js";

export const styles = {
  section: {
    border: `4px solid ${theme.palette.divider}`,
    overflow: "hidden",
    flexGrow: 1,
    width: "100%",
  } satisfies SxProps,

  container: (stage: MatchStage) => {
    return {
      mb: 2,
      mr: stage === "chat" ? 3 : 0,
      ml: stage === "chat" ? 3 : 0,
      width: stage === "chat" ? "1100px" : "750px",
    };
  },
  typing: {
    color: "common.black",
    fontSize: 21,
    textTransform: "uppercase",
  },
  typingDialog: (typing: boolean) => {
    return {
      opacity: typing ? 1 : 0,
      flexDirection: "row",
      flex: "flex-start",
      alignItems: "center",
      px: 4,
      py: 2,
      backgroundColor: "#747474",
      borderBottom: `4px solid ${theme.palette.divider}`,
      height: 30,
    };
  },
  dots: {
    marginLeft: "3px",
    width: 19,
    height: 9,
    background:
      "radial-gradient(circle closest-side, #000 90%, #0000) 0/calc((100%)/3) 100% space",
    backgroundPosition: "bottom center",
    backgroundSize: "5px 5px",
    clipPath: "inset(0 100% 0 0)",
    animation: "l1 1s steps(4) infinite",
    "@keyframes l1": {
      to: {
        clipPath: "inset(0 -34% 0 0)",
      },
    },
  },
};
