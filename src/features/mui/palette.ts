import { type Palette, type Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const palette = (theme: Theme): Palette => {
  return {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#FFFFFF",
      dark: grey[50],
      contrastText: grey[900],
    },
    orange: {
      light: "#FFF3E0",
      main: "#FFCC80",
      dark: "#FF9800",
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
  };
};
