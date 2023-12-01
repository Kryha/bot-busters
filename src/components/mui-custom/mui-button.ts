import { type Components, type Theme } from "@mui/material";

export const MuiButton = (theme: Theme): Components["MuiButton"] => {
  const { palette } = theme;
  return {
    variants: [
      {
        props: { variant: "contained" },
        style: {
          color: palette.secondary.main,
          padding: "0px 16px",
        },
      },
    ],
    styleOverrides: {
      startIcon: {
        marginRight: "16px",
      },
    },
  };
};
