import { createTheme } from "@mui/material/styles";

import { typography } from "./typography";
import { components } from "./components";
import { palette } from "./palette";

declare module "@mui/material/styles" {
  interface Palette {
    blueGrey: Palette["primary"];
    customGrey: Palette["primary"];
  }

  interface PaletteOptions {
    blueGrey?: Palette["primary"];
    customGrey?: Palette["primary"];
  }
}
declare module "@mui/material/Avatar" {
  interface AvatarPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
  }
}

export const theme = createTheme({});

theme.palette = {
  ...theme.palette,
  ...palette(theme),
};

theme.components = {
  ...theme.components,
  ...components(theme),
};

theme.typography = {
  ...theme.typography,
  ...typography(),
};
