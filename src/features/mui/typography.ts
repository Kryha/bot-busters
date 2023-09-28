import { type Theme } from "@mui/material";
import { type Typography } from "@mui/material/styles/createTypography";
import { Inter } from "next/font/google";

import { COEFFICIENT, FONT_SIZE } from "./constants";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const typography = (props: Theme): Typography => {
  const coefficient = FONT_SIZE / COEFFICIENT;
  const pxToRem = (px: number) => `${(px / FONT_SIZE) * coefficient}rem`;
  const { palette } = props;

  return {
    fontFamily: font.style.fontFamily,
    fontSize: FONT_SIZE,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    pxToRem: pxToRem,
    h1: {
      fontFamily: font.style.fontFamily,
      fontSize: "130px",
      fontWeight: 700,
      lineHeight: "117px",
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "200px",
        lineHeight: "187px",
      },
    },
    h2: {
      fontFamily: font.style.fontFamily,
      fontSize: "64px",
      fontWeight: 700,
      lineHeight: "64px",
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "114px",
        lineHeight: "114px",
      },
    },
    h3: {
      fontFamily: font.style.fontFamily,
      fontSize: "40px",
      fontWeight: 700,
      lineHeight: "44px",
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "70px",
        lineHeight: "74px",
      },
    },
    h4: {
      fontFamily: font.style.fontFamily,
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "26px",
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "44px",
        lineHeight: "46px",
      },
    },
    h5: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20px",
      "@media (min-width:2000px)": {
        fontSize: "36px",
        lineHeight: "40px",
      },
    },
    h6: {
      fontFamily: font.style.fontFamily,
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: "33.6px",
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "44px",
        lineHeight: "53.6px",
      },
    },
    subtitle1: {
      fontFamily: font.style.fontFamily,
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "20px",
      "@media (min-width:2000px)": {
        fontSize: "40px",
        lineHeight: "40px",
      },
    },
    subtitle2: {
      fontFamily: font.style.fontFamily,
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "18px",
      textTransform: "uppercase" as const,
      color: palette.secondary.dark,
      "@media (min-width:2000px)": {
        fontSize: "34px",
        lineHeight: "38px",
      },
    },
    body1: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "22.4px",
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "42px",
        lineHeight: 1.3,
      },
    },
    body2: {
      fontFamily: font.style.fontFamily,
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "19.6px",
      "@media (min-width:2000px)": {
        fontSize: "34px",
        lineHeight: "40.4px",
      },
    },
    button: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "22.6px",
      color: palette.primary.main,
      textTransform: "none" as const,
      "@media (min-width:2000px)": {
        fontSize: "45px",
        lineHeight: 1.2,
      },
    },
    caption: {
      fontFamily: font.style.fontFamily,
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "19.6px",
      textTransform: "uppercase" as const,
      color: palette.secondary.main,
      "@media (min-width:2000px)": {
        fontSize: "34px",
        lineHeight: "40.4px",
      },
    },
    overline: {
      fontFamily: font.style.fontFamily,
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "16.9px",
      color: palette.common.white,
      "@media (min-width:2000px)": {
        fontSize: "42px",
        lineHeight: 1.3,
      },
    },
  };
};
