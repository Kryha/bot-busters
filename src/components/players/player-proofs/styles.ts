import { breakpoints, theme } from "~/styles/index.js";
import { type SxStyleRecord } from "~/types/sx-style-record.js";

export const styles = {
  container: {
    mt: 2,
    width: "500px",
    flexDirection: "column",
    border: `4px solid ${theme.palette.customGrey.main}`,
    [`@media (max-width: ${breakpoints.md}px)`]: {
      mt: 4,
      width: "100%",
    },
  },
  resultsHeading: {
    p: 2,
    backgroundColor: "common.black",
    justifyContent: "center",
    alignItems: "center",
    "& > p": {
      textAlign: "center",
      "& > span": {
        textTransform: "uppercase",
      },
    },
  },
  proof: {
    p: 2,
    borderTop: `4px solid ${theme.palette.customGrey.main}`,
    backgroundColor: "common.black",
    height: "150px",
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
} satisfies SxStyleRecord;
