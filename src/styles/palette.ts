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
      light: "#f6c281",
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
      main: "#00FFAD",
      dark: "#009688",
      contrastText: "#FFFFFF",
    },
    pink: {
      light: "#F8BBD0",
      main: "#FE1BEF",
      dark: "#C2185B",
      contrastText: "#FFFFFF",
    },
    blue: {
      light: "#BBDEFB",
      main: "#0075FF",
      dark: "#1565C0",
      contrastText: "#FFFFFF",
    },
    yellow: {
      light: "#FFF9C4",
      main: "#FFEB3B",
      dark: "#FBC02D",
      contrastText: "#FFFFFF",
    },
    purple: {
      light: "#E1BEE7",
      main: "#9C27B0",
      dark: "#2E005C",
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
    error: theme.palette.augmentColor({
      color: {
        main: "#FF4823",
      },
    }),
    success: theme.palette.augmentColor({
      color: {
        main: "#5CFF00",
      },
    }),
    customGrey: theme.palette.augmentColor({
      color: {
        light: "#747474",
        main: "#494949",
      },
      name: "customGrey",
    }),
    darkBlue: theme.palette.augmentColor({
      color: {
        main: "#1976D2",
      },
      name: "darkBlue",
    }),
    disabled: theme.palette.augmentColor({
      color: {
        main: "#BDBDBD",
      },
    }),
  };
};
