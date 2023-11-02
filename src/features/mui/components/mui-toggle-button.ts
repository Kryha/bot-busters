import { type Components, type Theme } from "@mui/material";

export const MuiToggleButton = (_: Theme): Components["MuiToggleButton"] => {
  return {
    styleOverrides: {
      root: {
        minWidth: 90,
        height: 64,
        borderRadius: "4px !important",
        border: 0,
        // TODO: Fix colors after design system
        color: "#424242",
        backgroundColor: "#E0E0E0",

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
  };
};
