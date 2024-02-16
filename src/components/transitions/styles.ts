import { type SxProps } from "@mui/material";

export const styles = {
  avatar: {
    "& > svg": {
      width: "100%",
      height: "100%",
    },
  },
  splashText: {
    position: "absolute",
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
  },
  letsBustSomeBots: {
    position: "absolute",
    inset: 0,
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
