import { type Components, type Theme } from "@mui/material";

import { MuiButton } from "./mui-button";
import { MuiCard } from "./mui-card";
import { MuiAvatar } from "./mui-avatar";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiCard: MuiCard(theme),
    MuiAvatar: MuiAvatar(theme),
    MuiToggleButton: {
      styleOverrides: {
        root: {
          minWidth: 90,
          height: 64,
          borderRadius: "4px !important",
          border: 0,
          color: "#424242",
          backgroundColor: "#E0E0E0",
          // font
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 36,
          letterSpacing: 1.25,
          textAlign: "center",
          textTransform: "uppercase" as const,

          "&.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#1976D2",
            "&:hover": {
              backgroundColor: "#1976D2",
            },
          },
        },
      },
    },
  };
};
