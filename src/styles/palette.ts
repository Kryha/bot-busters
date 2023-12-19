import { type Palette, type Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const palette = (theme: Theme): Palette => {
  return {
    ...theme.palette,
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#494949",
      disabled: "#494949",
    },
    primary: {
      // ...theme.palette.primary,
      light: "#7CFF33",
      main: "#5CFF00" as const,
      dark: "#40B200",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#FF9C33",
      main: "#FF8400",
      dark: "#B25C00",
      contrastText: grey[900],
    },
    divider: "#494949",
    orange: {
      light: "#FF9C33",
      main: "#FF8400",
      dark: "#B25C00",
      contrastText: "#FFFFFF",
    },
    brown: {
      light: "#EFEBE9",
      main: "#BCAAA4",
      dark: "#795548",
      contrastText: "#FFFFFF",
    },
    green: {
      light: "#E0F2F1",
      main: "#80CBC4",
      dark: "#009688",
      contrastText: "#FFFFFF",
    },
    pink: {
      light: "#FCE4EC",
      main: "#F48FB1",
      dark: "#E91E63",
      contrastText: "#FFFFFF",
    },
    blue: {
      light: "#E3F2FD",
      main: "#90CAF9",
      dark: "#2196F3",
      contrastText: "#FFFFFF",
    },
    blueGrey: theme.palette.augmentColor({
      color: {
        light: "#ECEFF1",
        main: "#607D8B",
      },
      name: "blueGrey",
    }),
    warning: theme.palette.augmentColor({
      color: {
        main: "#FB8C00",
      },
    }),
    customGrey: theme.palette.augmentColor({
      color: {
        light: "#BDBDBD",
        main: "#9E9E9E",
      },
      name: "customGrey",
    }),
    darkBlue: theme.palette.augmentColor({
      color: {
        main: "#1976D2",
      },
      name: "darkBlue",
    }),
  };
};
