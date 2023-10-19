import { type Components, type Theme } from "@mui/material";

export const MuiIconButton = (theme: Theme): Components["MuiIconButton"] => {
  return {
    styleOverrides: {
      root: {
        "@media (min-width:2000px)": {
          fontSize: "2.2rem",
        },
      },
    },
  };
};
