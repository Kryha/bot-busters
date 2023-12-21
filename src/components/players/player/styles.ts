import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  character: {
    textTransform: "uppercase",
  },
  avatar: {
    width: 150,
    height: 150,
    "& > img": {
      width: "inherit",
      height: "inherit",
    },
    cursor: "pointer",
  } satisfies SxProps,
};
