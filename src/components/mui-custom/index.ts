import { type Components, type Theme } from "@mui/material";

import { MuiButton } from "./mui-button.js";
import { MuiCard } from "./mui-card.js";
import { MuiAvatar } from "./mui-avatar.js";
import { MuiToggleButton } from "./mui-toggle-button.js";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiCard: MuiCard(theme),
    MuiAvatar: MuiAvatar(theme),
    MuiToggleButton: MuiToggleButton(theme),
  };
};
