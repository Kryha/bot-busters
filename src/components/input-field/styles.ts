import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: (isFinished?: boolean) => {
    return {
      flexDirection: "row",
      backgroundColor: isFinished ? "grey.50" : "grey.200",
      padding: "16px 16px 16px 24px",
      gap: 1,
    };
  },
  inputField: {
    flexGrow: 1,
    backgroundColor: "common.black",
    borderRadius: 1,
  },
  inputFieldProps: {
    flexGrow: 1,
  },
  text: {
    flexGrow: 1,
    textAlign: "center",
    mb: 3,
  } satisfies SxProps,
};
