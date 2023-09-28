import { type Components, type Theme } from "@mui/material";

export const MuiSvgIcon = (_theme: Theme): Components["MuiSvgIcon"] => {
  return {
    styleOverrides: {
      root: {
        "@media (min-width:2000px)": {
          fontSize: "6rem",
        },
      },
    },
  };
};
