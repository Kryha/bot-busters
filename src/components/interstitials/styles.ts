import { type SxProps } from "@mui/material";

export const styles = {
  avatar: {
    "& > svg": {
      width: "100%",
      height: "100%",
    },
  },
  splashText: {
    flexDirection: "column",
    mt: 6,
    ml: 6,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "50vw",
      height: "auto",
    },
  },
  splashSection: {
    position: "absolute",
    inset: 0,
    flexDirection: "row",
  },
  letsBustSomeBots: {
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "100vw",
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
