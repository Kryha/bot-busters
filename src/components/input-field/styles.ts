import { theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record";

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
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
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
  },
  wrapperTextField: {
    width: "100%",
  },
  textInputField: {
    border: `4px solid ${theme.palette.text.disabled}`,
    flexGrow: 1,
    backgroundColor: "common.black",
    mt: "20px",
    mb: "40px",
    textTransform: "capitalize",
  },
  textInputFieldError: {
    border: `4px solid ${theme.palette.error.main}`,
    flexGrow: 1,
    backgroundColor: "common.black",
    mt: "20px",
    mb: "40px",
    textTransform: "capitalize",
  },
  textInputFieldProps: {
    flexGrow: 1,
    alignItems: "start",
    border: "none",
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
} satisfies SxStyleRecord;
