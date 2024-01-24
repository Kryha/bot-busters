import { theme } from "~/styles/theme.js";
import type { SxStyleRecord } from "~/types/sx-style-record";

export const styles = {
  container: {
    flexDirection: "column",
    mt: 1,
  },
  selectInputField: {
    border: `4px solid ${theme.palette.text.disabled}`,
    flexGrow: 1,
    backgroundColor: "common.black",
    mt: "20px",
    mb: "40px",
    textTransform: "capitalize",
    width: "63vw",
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  option: {
    textTransform: "capitalize",
    width: "63vw",
    "&.Mui-selected": {
      background: "transparent",
      color: theme.palette.secondary.dark,
    },
    "&.Mui-selected:hover": {
      background: "transparent",
    },
    "&:hover": {
      background: theme.palette.secondary.dark,
    },
  },
  disabledText: {
    color: `${theme.palette.text.disabled}`,
  },
} satisfies SxStyleRecord;
