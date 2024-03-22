import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    flexDirection: "row",
    width: "100%",
  },
  filler: {
    height: "100%",
    width: "18px",
    background: theme.palette.divider,
  },
  typing: {
    color: "common.black",
    fontSize: 16,
    textTransform: "uppercase",
  },
  typingDialog: (typing: boolean) => {
    return {
      opacity: typing ? 1 : 0,
      flexDirection: "row",
      justifyContent: "flex-start",
      flexGrow: 1,
      alignItems: "center",
      px: 2,
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
      "radial-gradient(square closest-side, #000 90%, #0000) 0/calc((100%)/3) 100% space",
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
  loading: {
    mr: 4,
    fontSize: "16px",
    fontFamily: theme.typography.caption.fontFamily,
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
        color: "black ",
        textShadow: ".25em 0 0 black, .5em 0 0 rgba(0,0,0,0)",
      },
      "80%, 100%": {
        color: "black ",
        textShadow: ".25em 0 0 black, .5em 0 0 black",
      },
    },
    "&:after": {
      content: "'.'",
      animation: "dots 1s steps(5, end) infinite",
    },
  },
};
