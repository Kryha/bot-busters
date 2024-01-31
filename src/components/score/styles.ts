import { type SxProps, tooltipClasses } from "@mui/material";
import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    flex: "1 1 auto",
    width: "100%",
    border: `4px solid ${theme.palette.customGrey.main}`,
  },
  heading: {
    textTransform: "uppercase",
    textAlign: "center",
    padding: 4,
    borderBottom: `4px solid ${theme.palette.customGrey.main}`,
  },
  achievements: {
    flex: "1 1 auto",
    overflowY: "scroll",
  },
  achievement: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "16px 16px",
    borderBottom: `4px solid ${theme.palette.customGrey.main}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.customGrey.main,
    },
  },
  toolTip: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.customGrey.main,
    color: theme.palette.common.white,
    fontSize: 16,
    p: 2,
    borderRadius: 0,
  },
  toolTipPopper: {
    [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
      {
        marginTop: "-4px",
        marginRight: "0px",
        width: 300,
      },
  },
  score: {
    textTransform: "uppercase",
    flex: "0",
    borderTop: `4px solid ${theme.palette.customGrey.main}`,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  points: {
    gap: 1,
  },
  point: {
    flexDirection: "row",
    justifyContent: "space-between",
  } satisfies SxProps,
};
