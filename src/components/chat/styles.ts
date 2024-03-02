import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";
import { type MatchStage } from "~/types/index.js";

export const styles = {
  section: {
    border: `4px solid ${theme.palette.divider}`,
    overflow: "hidden",
    flexGrow: 1,
    width: "100%",
  } satisfies SxProps,

  container: (stage: MatchStage) => {
    return {
      mb: 2,
      mr: stage === "chat" ? 3 : 0,
      ml: stage === "chat" ? 3 : 0,
      width: stage === "chat" ? "1100px" : "750px",
    };
  },
};
