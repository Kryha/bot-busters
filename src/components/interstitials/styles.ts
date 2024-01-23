import { type SxProps } from "@mui/material";

export const styles = {
  avatar: {
    position: "absolute",
    background: "transparent",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
    width: "auto",
    height: "100vh",
    "& > img": {
      width: "inherit",
      height: "inherit",
      objectFit: "contain",
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
