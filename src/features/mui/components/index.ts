import { type Components, type Theme } from "@mui/material";

import { MuiButton } from "./mui-button";
import { MuiCard } from "./mui-card";
import { MuiAvatar } from "./mui-avatar";
import { MuiToggleButton } from "./mui-toggle-button";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiCard: MuiCard(theme),
    MuiAvatar: MuiAvatar(theme),
    MuiToggleButton: MuiToggleButton(theme),
  };
};
