import { type SxProps } from "@mui/material";

export const styles: Record<string, SxProps> = {
  wrapper: {
    flexDirection: "row",
    backgroundColor: "grey.200",
    padding: "16px 16px 16px 24px",
    gap: 1,
  },
  inputField: {
    flexGrow: 1,
    backgroundColor: "grey.50",
    borderRadius: 1,
  },
  inputFieldProps: {
    flexGrow: 1,
  } satisfies SxProps,
};
