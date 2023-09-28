import { type Components, type Theme } from "@mui/material";

import { MuiButton } from "./mui-button";
import { MuiCard } from "./mui-card";
import { MuiIconButton } from "./mui-icon-button";
import { MuiSvgIcon } from "./mui-svg-icon";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiCard: MuiCard(theme),
    MuiIconButton: MuiIconButton(theme),
    MuiSvgIcon: MuiSvgIcon(theme),
  };
};
