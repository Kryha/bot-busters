import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme";

export const styles = {
  section: (isDisabled: boolean) => {
    return {
      border: `4px solid ${theme.palette.divider}`,
      overflow: "hidden",
      flexGrow: 1,
      maxWidth: !isDisabled ? "1100px" : undefined,
    } satisfies SxProps;
  },
};
