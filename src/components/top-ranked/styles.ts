import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    position: "fixed",
    left: 0,
    bottom: 0,
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    // TODO: Add color to theme
    backgroundColor: "#EEEEEE",
  },
  textContainer: {
    flexDirection: "row",
    gap: 4,
    pr: 4,
  },
  animation1: {
    animation: "infinite_text_primary 20s linear infinite",
  },
  animation2: {
    animation: "infinite_text_secondary 20s linear infinite",
    animationDelay: "5s",
  },
  text: {
    whiteSpace: "nowrap",
  } satisfies SxProps,
};
