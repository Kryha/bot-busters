import { type Components, type Theme } from "@mui/material";

export const MuiButton = (theme: Theme): Components["MuiButton"] => {
  const { palette } = theme;
  return {
    variants: [
      {
        props: { variant: "contained" },
        style: {
          color: palette.secondary.main,
          fontWeight: "bold",
          padding: "12px 32px",
          borderRadius: "40px",
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
