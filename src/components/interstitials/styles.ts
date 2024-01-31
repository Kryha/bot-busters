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
    marginTop: "46px",
    paddingLeft: 2,
    paddingRight: 2,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "80vw",
      height: "auto",
    },
  },
  splashHeading: {
    "& > svg": {
      width: "40vw",
      height: "auto",
    },
  },
} satisfies SxProps;
