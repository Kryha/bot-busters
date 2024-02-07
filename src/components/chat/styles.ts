import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";
import { type MatchStage } from "~/types/index.js";

export const styles = {
  section: (isDisabled: boolean) => {
    return {
      border: `4px solid ${theme.palette.divider}`,
      overflow: "hidden",
      flexGrow: 1,
      maxWidth: !isDisabled ? "1100px" : undefined,
    } satisfies SxProps;
  },
  container: (stage: MatchStage) => {
    return {
      mb: 2,
      width: stage === "chat" ? "1100px" : "750px",
    };
  },
};
