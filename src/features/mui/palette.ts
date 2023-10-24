import { type Palette, type Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const palette = (theme: Theme): Palette => {
  return {
    ...theme.palette,
    primary: {
      light: grey.A700,
      main: grey[900],
      dark: grey[800],
      contrastText: grey[50],
    },
    secondary: {
      light: grey.A200,
      main: grey[300],
      dark: grey[400],
      contrastText: grey[900],
    },
  };
};
