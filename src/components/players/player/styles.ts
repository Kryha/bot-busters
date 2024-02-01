import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";
import { zIndex } from "~/styles/z-index.js";

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
  selectBot: (isBotSelected?: boolean) => {
    return {
      textTransform: "uppercase",
      opacity: isBotSelected ? 1 : 0,
    };
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "& > svg": {
      width: 15,
      height: 10,
    },
  },
  avatarContainer: {
    position: "absolute",
  },
  avatarResult: {
    zIndex: zIndex.middle,
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
      if (isSelected === isBot) {
        textColor = theme.palette.success.main;
      } else {
        textColor = theme.palette.error.main;
      }
    }

    return {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1,
      "& > svg": {
        width: 15,
        height: 10,
        "& > path": {
          fill: textColor,
          stroke: textColor,
        },
      },
      "& > span": {
        lineHeight: "normal",
      },
      textTransform: "uppercase",
      cursor: "pointer",
      color: textColor,
      "&:hover": {
        textDecoration: "underline",
      },
    };
  },
};
