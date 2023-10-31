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
    blueGrey: theme.palette.augmentColor({
      color: {
        main: "#607D8B",
      },
      name: "blueGrey",
    }),
    customGrey: theme.palette.augmentColor({
      color: {
        light: "#BDBDBD",
        main: "#9E9E9E",
      },
      name: "customGrey",
    }),
    orange: theme.palette.augmentColor({
      color: {
        main: "#FB8C00",
      },
      name: "orange",
    }),
  };
};
