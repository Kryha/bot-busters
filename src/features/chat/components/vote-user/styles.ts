import { type SxProps } from "@mui/material";

export const styles = {
  container: {
    flexDirection: "row",
    gap: 1,
  },
  usernameContainer: {
    minWidth: 250,
    justifyContent: "space-between",
  },
  username: {
    pl: 2,
  } satisfies SxProps,
};
