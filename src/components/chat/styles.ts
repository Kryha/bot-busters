import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";
import { type MatchStage } from "~/types/index.js";

export const styles = {
  section: (isDisabled: boolean) => {
    return {
      border: `4px solid ${theme.palette.divider}`,
      overflow: "hidden",
      flexGrow: 1,
      // don't use max-width or else text will make this component wider
      width: !isDisabled ? "65vw" : undefined,
    } satisfies SxProps;
  },
  container: (stage: MatchStage) => {
    return {
      mb: 2,
      width: stage === "chat" ? "1100px" : "750px",
    };
  },
};
