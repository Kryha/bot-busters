import { DRAWER_WIDTH, MOBILE_DRAWER_WIDTH } from "@/constants";
import { type SxProps } from "@mui/material";

export const styles = {
  toolbar: {
    backgroundColor: "secondary.light",
    justifyContent: "flex-end",
    width: DRAWER_WIDTH,
    gap: 1,
    "@media (max-width:600px)": {
      width: MOBILE_DRAWER_WIDTH,
    },
  },

  avatar: {
    cursor: "pointer",
  } satisfies SxProps,
};
