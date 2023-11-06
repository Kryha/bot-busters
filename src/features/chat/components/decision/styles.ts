import { type SxProps } from "@mui/material";

export const styles: Record<string, SxProps> = {
  wrapper: {
    alignItems: "center",
    pt: "217px",
    pb: "192px",
    height: "100vh",
    width: "100%",
    justifyContent: "space-between",
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 2,
    alignItems: "center",
  },
  button: {
    p: "11px 60px",
  },
  buttonContainer: { gap: 1, mt: 2 } satisfies SxProps,
};
