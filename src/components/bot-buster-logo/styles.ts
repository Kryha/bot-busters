import { zIndex } from "~/styles/z-index";
import { breakpoints } from "~/styles";

export const styles = {
  container: {
    width: "100%",
    height: "100%",
    minWidth: "980px",
    minHeight: "220px",
  },
  logo: {
    position: "relative",
    flexDirection: "column",
    zIndex: zIndex.front,
    ml: 3,
    mt: 3,
    mb: 5,
    width: "70vw",
    textAlign: "center",
    minWidth: "1080px",
    minHeight: "250px",
    [`@media (min-width: ${breakpoints.xl}px)`]: {
      mt: 10,
    },
  },
  whoIsABot: (showText: boolean) => {
    return {
      opacity: showText ? 1 : 0,
      position: "absolute",
      zIndex: zIndex.front,
      top: "0",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  },
  aleoSystems: (showText: boolean) => {
    return {
      opacity: showText ? 1 : 0,
      position: "absolute",
      zIndex: zIndex.front,
      right: "20%",
      bottom: 0,
      fontSize: "14px",
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        bottom: "20px",
      },
    };
  },
};
