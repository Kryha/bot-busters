import { theme } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "customGrey.main",
    position: "relative",
  },
  matchMaking: {
    fontFamily: theme.typography.h1.fontFamily,
  },
  progress: (progress: number) => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: `${progress}%`,
      height: "60px",
      backgroundColor: theme.palette.primary.main,
      alignItems: "flex-end",
    };
  },
  loadingWrapper: {
    justifyContent: "space-between",
    textTransform: "uppercase",
    width: "100%",
    position: "relative",
    flexDirection: "row",
    pl: 1,
  },
  loading: {
    mr: 4,
    fontSize: "48px",
    lineHeight: "60px",
    fontFamily: theme.typography.h1.fontFamily,
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
        textShadow: ".25em 0 0 black, .5em 0 0 rgba(0,0,0,0)",
      },
      "80%, 100%": {
        textShadow: ".25em 0 0 black, .5em 0 0 black",
      },
    },
    "&:after": {
      content: "'.'",
      animation: "dots 1s steps(5, end) infinite",
    },
  },
};
