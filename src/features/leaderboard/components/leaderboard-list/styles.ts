import { type SxProps } from "@mui/material";

export const styles = {
  list: { pt: 0, mb: 2 },
  box: {
    width: "50vw",
    "@media (max-width:600px)": {
      width: "100vw",
    },
  },
  listItem: { mb: 2 },
  divider: {
    opacity: 0.2,
    mr: 2,
  } satisfies SxProps,
};
