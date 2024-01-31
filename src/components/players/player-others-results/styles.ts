import { type SxProps } from "@mui/material";
import { theme } from "~/styles/index.js";

export const styles = {
  playerResults: {
    mt: 4,
    mb: 2,
    flex: 1,
    flexDirection: "column",
    border: `4px solid ${theme.palette.customGrey.main}`,
  },
  resultsHeading: {
    p: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottom: `4px solid ${theme.palette.customGrey.main}`,
    "& > p": {
      textAlign: "center",
      "& > span": {
        textTransform: "uppercase",
      },
    },
  },
  proof: {
    p: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  verifyProof: {
    mt: 4,
    lineHeight: "normal",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
} satisfies SxProps;
