import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    gap: "10px",
  },
  text: {
    textTransform: "uppercase",
  },
  user: {
    pl: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  } satisfies SxProps,
};
