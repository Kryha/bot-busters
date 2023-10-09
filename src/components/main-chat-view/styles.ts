import { DRAWER_WIDTH } from "@/constants";
import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    ml: `${DRAWER_WIDTH}px`,
    backgroundColor: "common.white",
    "@media (max-width:600px)": {
      ml: 0,
    },
  },
  container: {
    pt: 1,
    pl: 5,
    pr: 5,
    overflowY: "auto",
    flexDirection: "column-reverse",
    height: "calc(100vh - 120px)",
    "@media (max-width:600px)": {
      height: "calc(100dvh - 112px)",
      pl: 3,
      pr: 3,
    },
  },
  input: {
    position: "fixed",
    bottom: 0,
    width: `calc(100vw - ${DRAWER_WIDTH}px)`,
    backgroundColor: "common.white",
    "@media (max-width:600px)": {
      width: 1,
    },
  },
  text: {
    ml: `${DRAWER_WIDTH}px`,
  } satisfies SxProps,
};
