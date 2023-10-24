import { type Components, type Theme } from "@mui/material";

import { MuiButton } from "./mui-button";
import { MuiCard } from "./mui-card";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiCard: MuiCard(theme),
  };
};
