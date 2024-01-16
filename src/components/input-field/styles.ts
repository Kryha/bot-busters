import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme.js";

export const styles = {
  wrapper: {
    flexDirection: "row",
    mt: 1,
    border: `4px solid ${theme.palette.primary.main}`,
    "& > button": {
      border: "none",
      width: "150px",
      gap: 0,
      pl: 0,
    },
  },
  inputField: {
    borderRight: `4px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    backgroundColor: "common.black",
  },
  inputFieldProps: {
    flexGrow: 1,
    border: "none",
    "&:hover": {
      border: "none",
    },
    "&:focus": {
      border: "none",
    },
    "&:active": {
      border: "none",
    },
  },
  text: {
    flexGrow: 1,
    textAlign: "center",
    mb: 3,
  } satisfies SxProps,
};
