import { type SxProps } from "@mui/material";
import { breakpoints } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  } as SxProps,
  container: {
    width: "80vw",
    [`@media (max-width: ${breakpoints.md}px)`]: {
      width: "90vw",
    },
    mb: 2,
  } as SxProps,
  header: {
    fontWeight: "400",
    fontStyle: "italic",
  } as SxProps,
  body: {
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "45px",
    overflow: "wrap",
  } as SxProps,
};
