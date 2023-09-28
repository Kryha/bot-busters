import { type Components, type Theme } from "@mui/material";

export const MuiIconButton = (theme: Theme): Components["MuiIconButton"] => {
  const { palette } = theme;
  return {
    styleOverrides: {
      root: {
        "&.Mui-disabled": {
          color: palette.opaqueGrey.main,
        },
        "@media (min-width:2000px)": {
          fontSize: "6rem",
          padding: "18px",
        },
      },
    },
  };
};
