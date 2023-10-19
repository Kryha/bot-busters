import { type Components } from "@mui/material";

export const MuiIconButton = (): Components["MuiIconButton"] => {
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
