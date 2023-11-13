import { type SxProps } from "@mui/material";

export const styles = {
  pointsContainer: (isCentered?: boolean) => {
    return { alignItems: isCentered ? "center" : "flex-start" };
  },
  pointsWrapper: { flexDirection: "row", gap: 5 },
  info: {
    lineHeight: "24px",
  } satisfies SxProps,
};
