import { type Components, type Theme } from "@mui/material";

export const MuiCard = (theme: Theme): Components["MuiCard"] => {
  const { palette } = theme;
  return {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
        padding: "40px !important",
        gap: "25px",
        cursor: "pointer",
        margin: "0 !important",
        border: `1px dashed ${palette.secondary.main}`,
        backgroundColor: "transparent",
        "&:hover": {
          boxShadow:
            "0px 7px 9px -4px rgba(0,0,0,0.2), 0px 14px 21px 2px rgba(0,0,0,0.14), 0px 5px 26px 4px rgba(0,0,0,0.12)",
        },
      },
    },
  };
};
