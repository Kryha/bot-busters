import { createTheme } from "@mui/material/styles";

import { components } from "~/components/mui-custom/index.js";

import { palette } from "./palette.js";
import { typography } from "./typography.js";

declare module "@mui/material/styles" {
  interface Palette {
    blueGrey: Palette["primary"];
    customGrey: Palette["primary"];
    orange: Palette["primary"];
    brown: Palette["primary"];
    green: Palette["primary"];
    pink: Palette["primary"];
    blue: Palette["primary"];
    darkBlue: Palette["primary"];
  }

  interface PaletteOptions {
    blueGrey?: Palette["primary"];
    customGrey?: Palette["primary"];
    orange?: PaletteOptions["primary"];
    brown?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    pink?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    darkBlue: Palette["primary"];
  }
}
declare module "@mui/material/Avatar" {
  interface AvatarPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
    orange: true;
    brown: true;
    green: true;
    pink: true;
    blue: true;
    darkBlue: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
    orange: true;
    brown: true;
    green: true;
    pink: true;
    blue: true;
    darkBlue: true;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
    darkBlue: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    blueGrey: true;
    customGrey: true;
    darkBlue: true;
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
