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
    backgroundColor: "#FE1BEF",
  },
  points: {
    fontSize: "60%",
    position: "absolute",
    top: -7,
    left: "100%",
    marginLeft: "0px",
  },
  textContainer: {
    flexDirection: "row",
    gap: 4,
    pr: 4,
  },
  topRankedBanner1: {
    animation: "infinite_text_primary 40s linear infinite",
  },
  topRankedBanner2: {
    animation: "infinite_text_secondary 40s linear infinite",
    animationDelay: "10s",
  },
  title: {
    ml: 2,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  text: {
    ml: 2,
    mr: 2,
    position: "relative",
    whiteSpace: "nowrap",
  } satisfies SxProps,
};
