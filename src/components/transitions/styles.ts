import { type SxProps } from "@mui/material";
import { zIndex } from "~/styles/z-index.js";

export const styles = {
  avatar: {
    position: "absolute",
    inset: 0,
    zIndex: zIndex.middle,
    "& > svg": {
      width: "100%",
      height: "100%",
      preserveAspectRatio: "xMidYMax slice",
    },
  },
  splashText: {
    position: "absolute",
    zIndex: zIndex.front,
    inset: 0,
    flexDirection: "column",
    mt: 12,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "80%",
      height: "auto",
    },
  },
  splashSection: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  letsBustSomeBots: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "80%",
      height: "auto",
    },
  },
  splashHeading: {
    "& > svg": {
      width: "100%",
      height: "auto",
    },
  },
} satisfies SxProps;
