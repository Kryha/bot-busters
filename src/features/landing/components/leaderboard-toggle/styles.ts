import { type SxProps } from "@mui/material";

export const styles = {
  buttonGroup: {
    width: "590px",
    mb: 5,
    "& .MuiButtonGroup-middleButton": { borderColor: "customGrey.main" },
  },
  button: {
    p: "0px 16px",
    borderRadius: 1,
    flex: "1 0 0",
  } satisfies SxProps,
};
