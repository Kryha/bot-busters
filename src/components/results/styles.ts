import { type SxProps } from "@mui/material";

export const styles: Record<string, SxProps> = {
  wrapper: {
    alignItems: "center",
    width: "100%",
  },
  textWrapper: {
    flex: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 2,
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  buttonContainer: {
    flex: 0,
    gap: 1,
    mt: 2,
    mb: 2,
    width: "100%",
  } satisfies SxProps,
};
