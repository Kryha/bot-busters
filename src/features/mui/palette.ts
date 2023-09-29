import { type Palette, type Theme } from "@mui/material";

export const palette = (theme: Theme): Palette => {
  return {
    ...theme.palette,
    common: {
      black: "#121113",
      white: "#FFFFFF",
    },
    primary: {
      light: "#D6FF33",
      main: "#CCFF00",
      dark: "#8FB300",
      contrastText: "#121113",
    },
    secondary: {
      light: "#D7CEF1",
      main: "#AFA3D1",
      dark: "#453C62",
      contrastText: "#ffffff",
    },
    error: {
      light: "#E84F55",
      main: "#E3242B",
      dark: "#9E191E",
      contrastText: "#121113",
    },
    text: {
      primary: "#121113",
      secondary: "#FFFFFF",
      disabled: "#ffffff",
    },
    kryhaGrey: theme.palette.augmentColor({
      color: {
        main: "#E1E3D8",
      },
    }),
    opaqueGrey: theme.palette.augmentColor({
      color: {
        main: "rgba(255, 255, 255, 0.40)",
      },
    }),
    background: {
      paper: "#F2F3FD",
      default: "#453C62",
    },
    divider: "#797596",
  };
};
