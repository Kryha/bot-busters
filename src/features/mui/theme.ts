import { createTheme } from "@mui/material/styles";

import { typography } from "./typography";
import { components } from "./components";
import { palette } from "./palette";

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
