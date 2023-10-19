import { type Components, type Theme } from "@mui/material";

import { MuiButton } from "./mui-button";
import { MuiCard } from "./mui-card";
import { MuiIconButton } from "./mui-icon-button";
import { MuiSvgIcon } from "./mui-svg-icon";
import { MuiAvatar } from "./mui-avatar";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiCard: MuiCard(theme),
    MuiIconButton: MuiIconButton(),
    MuiSvgIcon: MuiSvgIcon(theme),
    MuiAvatar: MuiAvatar(theme),
  };
};
