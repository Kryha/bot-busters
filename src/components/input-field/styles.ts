import { theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record.js";

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
  usernameWrapper: {
    flexDirection: "row",
    mt: 1,
    border: `4px solid ${theme.palette.primary.main}`,
    width: "60vw",
    "& > button": {
      border: "none",
      minWidth: "150px",
      gap: 0,
      pl: 0,
    },
  },
  usernameWrapperError: {
    flexDirection: "row",
    mt: 1,
    border: `4px solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
    width: "60vw",
    "& > button": {
      color: theme.palette.error.main,
      border: "none",
      minWidth: "150px",
      gap: 0,
      pl: 0,
    },
    "&:hover": {
      background: theme.palette.error.main,
      color: theme.palette.error.main,
      "& > svg": {
        "& > path": {
          fill: theme.palette.error.main,
          stroke: theme.palette.error.main,
        },
      },
    },
  },
  inputField: {
    borderRight: `4px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    backgroundColor: "common.black",
  },
  usernameInputField: {
    borderRight: `4px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    backgroundColor: "common.black",
    minWidth: "400px",
  },
  usernameInputFieldError: {
    borderRight: `4px solid ${theme.palette.error.main}`,
    flexGrow: 1,
    backgroundColor: "common.black",
    minWidth: "400px",
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
    textTransform: "capitalize",
  },
  textInputFieldError: {
    border: `4px solid ${theme.palette.error.main}`,
    flexGrow: 1,
    backgroundColor: "common.black",
    mt: "20px",
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
  errorText: {
    color: theme.palette.error.main,
    pt: "10px",
    height: "60px",
  },
} satisfies SxStyleRecord;
