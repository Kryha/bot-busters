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
      root: {
        "@media (min-width:2000px)": {
          fontSize: "3.4rem",
        },
      },
      startIcon: {
        marginRight: "16px",
        "@media (min-width:2000px)": {
          "> svg": {
            fontSize: "6rem !important",
          },
        },
      },
    },
  };
};
