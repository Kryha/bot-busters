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
    pt: 1,
    pb: 1,
    pl: 2,
    pr: 2,
    "textarea::placeholder": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 1,
      textAlign: "center",
    },
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
    "&:hover fieldset": {
      border: "none",
    },
    "&.MuiInputBase-root": {
      pl: 1,
      pr: 0,
      pt: 0,
      pb: 0,
      "&::-webkit-scrollbar-thumb ": {
        backgroundColor: "common.black",
      },
    },
    "&.MuiOutlinedInput-root": {
      color: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      border: "none",
      padding: "none",
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
    color: theme.palette.text.primary,
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
