import { type SxProps } from "@mui/material";

export const styles = {
  wrapper: {
    flexDirection: "row",
    gap: 1,
    mt: 1,
  },
  iconButton: {
    backgroundColor: "darkBlue.main",
    borderRadius: 1,
    p: "12px 13px",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "darkBlue.main" },
  },
  icon: { width: "0.8em", height: "0.8em" } satisfies SxProps,
};
