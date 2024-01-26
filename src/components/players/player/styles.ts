import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";
import { zIndex } from "~/styles/z-index";

export const styles = {
  container: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  character: {
    textTransform: "uppercase",
  },
  selectBot: {
    textTransform: "uppercase",
  },
  avatarContainer: {
    position: "absolute",
  },
  avatarResult: {
    zIndex: zIndex.front,
  },
  avatar: {
    width: 150,
    height: 150,
    "& > img": {
      width: "inherit",
      height: "inherit",
    },
    cursor: "pointer",
  } satisfies SxProps,
  botResult: (stage: string, isBot?: boolean, isSelected?: boolean) => {
    let textColor = theme.palette.common.white;

    if (stage === "voting") {
      textColor = isSelected
        ? theme.palette.success.main
        : theme.palette.common.white;
    } else if (stage === "results") {
      if (isSelected === false && isBot === false) {
        textColor = theme.palette.common.white;
      } else if (isSelected === true && isBot === false) {
        textColor = theme.palette.error.main;
      } else if (isSelected === true && isBot === true) {
        textColor = theme.palette.success.main;
      }
    }
    return {
      textTransform: "uppercase",
      textDecoration: isBot ? "underline" : "none",
      cursor: isBot ? "pointer" : "default",
      color: textColor,
    };
  },
};
