import { type Components, type Theme } from "@mui/material";

export const MuiAvatar = (_theme: Theme): Components["MuiAvatar"] => {
  return {
    styleOverrides: {
      root: {
        "@media (min-width:2000px)": {
          width: "50px",
          height: "50px",
        },
      },
    },
  };
};
