import { type SxProps } from "@mui/material";
import { type SxStyleRecord } from "~/types/sx-style-record.js";
import { zIndex } from "~/styles/z-index.js";
import { theme } from "~/styles/index.js";

export const styles = {
  wrapper: {
    position: "relative",
    justifyContent: "start",
    width: "100%",
    height: "100vh",
  },
  container: {
    backgroundColor: theme.palette.purple.dark,
    width: "100vw",
    height: "100%",
  },
  logo: {
    position: "relative",
    zIndex: zIndex.front,
    mt: 3,
    mb: 5,
    ml: 4,
    width: "800px",
    height: "220px",
    textAlign: "center",
    justifyContent: "start",
  },
  aleoSystems: {
    zIndex: zIndex.front,
    position: "absolute",
    right: "40px",
    bottom: 0,
  },
  startGameButton: {
    width: "100%",
  },
  openDailyButton: {
    p: "12px 120px",
  },
  actions: {
    zIndex: zIndex.front,
    gap: 2,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "100px",
  },
  menuActions: {
    zIndex: zIndex.front,
    transform: " skew(-15deg)",
    pt: 2,
    pb: 2,
    pl: 2,
    pr: 4,
    justifyContent: "start",
    alignItems: "start",
    backgroundColor: "common.black",
    "& > button": {
      transform: "skew(15deg)",
    },
    "& > button:last-of-type": {
      ml: 2,
    },
  },
  buttonText: { textTransform: "none" } satisfies SxProps,
} satisfies SxStyleRecord;
