import { type SxProps } from "@mui/material";
import { type SxStyleRecord } from "~/types/sx-style-record.js";
import { zIndex } from "~/styles/z-index.js";
import { breakpoints } from "~/styles/index.js";

export const styles = {
  wrapper: {
    overflow: "hidden !important",
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  container: {
    position: "absolute",
    inset: 0,
    height: "100%",
  },
  logo: {
    position: "relative",
    flexDirection: "column",
    zIndex: zIndex.front,
    ml: 3,
    mt: 3,
    mb: 5,
    width: "70vw",
    textAlign: "center",
    minWidth: "1080px",
    minHeight: "250px",
    [`@media (min-width: ${breakpoints.xl}px)`]: {
      mt: 10,
    },
  },
  whoIsABot: {
    position: "absolute",
    zIndex: zIndex.front,
    top: "0",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  aleoSystems: {
    position: "absolute",
    zIndex: zIndex.front,
    right: "20%",
    bottom: 0,
    fontSize: "14px",
    [`@media (min-width: ${breakpoints.xl}px)`]: {
      bottom: "20px",
    },
  },
  startGameButton: {
    width: "100%",
  },
  openDailyButton: {
    p: "12px 120px",
  },
  actions: {
    position: "absolute",
    left: "150px",
    bottom: "calc(20vh - 65px)",
    zIndex: zIndex.front,
    gap: 2,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  menuActions: {
    marginTop: "32px",
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
