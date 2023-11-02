import { type Components, type Theme } from "@mui/material";

export const MuiAvatar = (theme: Theme): Components["MuiAvatar"] => {
  const { palette } = theme;
  return {
    styleOverrides: {
      root: {
        borderRadius: "4px",
        "> img": {
          height: "32px",
          width: "23px",
          objectFit: "contain",
        },
      },
    },
    variants: [
      {
        props: { color: "orange" },
        style: {
          backgroundColor: palette.orange.main,
        },
      },
      {
        props: { color: "brown" },
        style: {
          backgroundColor: palette.brown.main,
        },
      },
      {
        props: { color: "green" },
        style: {
          backgroundColor: palette.green.main,
        },
      },
      {
        props: { color: "pink" },
        style: {
          backgroundColor: palette.pink.main,
        },
      },
      {
        props: { color: "blue" },
        style: {
          backgroundColor: palette.blue.main,
        },
      },
    ],
  };
};
