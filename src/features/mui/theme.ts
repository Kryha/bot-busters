import { createTheme } from "@mui/material/styles";

import { typography } from "./typography";
import { components } from "./components";
import { palette } from "./palette";

declare module "@mui/material/styles" {
  interface Palette {
    kryhaGrey: Palette["primary"];
    opaqueGrey: Palette["primary"];
  }

  interface PaletteOptions {
    kryhaGrey?: PaletteOptions["primary"];
    opaqueGrey: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    kryhaGrey: true;
    opaqueGrey: true;
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
  ...typography(theme),
};
