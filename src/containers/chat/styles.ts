import { type SxProps } from "@mui/material";

export const styles = {
  section: (isDisabled: boolean) => {
    return {
      //TODO: update to divider color
      border: "4px solid #494949",
      overflow: "hidden",
      flexGrow: 1,
      maxWidth: !isDisabled ? "1100px" : undefined,
    } satisfies SxProps;
  },
};
