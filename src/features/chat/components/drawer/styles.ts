import { DRAWER_WIDTH, MOBILE_DRAWER_WIDTH } from "@/constants";
import { type SxProps } from "@mui/material";

export const styles = {
  nav: {
    // width: { sm: MOBILE_DRAWER_WIDTH },
    flexShrink: { sm: 0 },
  },
  drawerMobile: {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: MOBILE_DRAWER_WIDTH,
      backgroundColor: "common.white",
    },
  },
  drawerDesktop: {
    display: { xs: "none", sm: "block" },
    maxWidth: 350,
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: DRAWER_WIDTH,
      backgroundColor: "common.white",
    },
  },
  list: {
    pt: 0,
  },
  divider: {
    opacity: 0.2,
    mr: 2,
  } satisfies SxProps,
};
