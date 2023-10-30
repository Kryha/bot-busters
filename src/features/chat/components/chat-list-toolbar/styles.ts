import { MOBILE_DRAWER_WIDTH } from "@/constants";
import { type SxProps } from "@mui/material";

export const styles = {
  toolbar: {
    flexDirection: "row",
    backgroundColor: "secondary.light",
    justifyContent: "flex-end",
    gap: 1,
    "@media (max-width:600px)": {
      width: MOBILE_DRAWER_WIDTH,
    },
  },

  avatar: {
    cursor: "pointer",
  } satisfies SxProps,
};
