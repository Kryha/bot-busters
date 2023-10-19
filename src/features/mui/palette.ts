import { type Palette, type Theme } from "@mui/material";

export const palette = (theme: Theme): Palette => {
  return {
    ...theme.palette,
  };
};
