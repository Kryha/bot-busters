import { createTheme } from "@mui/material/styles";

import { typography } from "./typography";
import { components } from "./components";
import { palette } from "./palette";

declare module "@mui/material/styles" {
  interface Palette {
    orange: Palette["primary"];
    brown: Palette["primary"];
    green: Palette["primary"];
    pink: Palette["primary"];
    blue: Palette["primary"];
  }

  interface PaletteOptions {
    orange?: PaletteOptions["primary"];
    brown?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    pink?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Avatar" {
  interface AvatarPropsColorOverrides {
    orange: true;
    brown: true;
    green: true;
    pink: true;
    blue: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    orange: true;
    brown: true;
    green: true;
    pink: true;
    blue: true;
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
