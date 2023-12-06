import { type Typography } from "@mui/material/styles/createTypography.js";
import { Roboto } from "next/font/google";

import { COEFFICIENT, FONT_SIZE } from "~/constants/index.js";

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const typography = (): Typography => {
  const coefficient = FONT_SIZE / COEFFICIENT;
  const pxToRem = (px: number) => `${(px / FONT_SIZE) * coefficient}rem`;

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
      fontSize: "88px",
      fontWeight: 400,
      lineHeight: "96px",
    },
    h2: {
      fontSize: "57px",
      lineHeight: "60px",
      fontFamily: font.style.fontFamily,
      fontWeight: 400,
    },
    h3: {
      fontFamily: font.style.fontFamily,
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: "50px",
    },
    h4: {
      fontFamily: font.style.fontFamily,
      fontSize: "34px",
      fontWeight: 400,
      lineHeight: "40px",
    },
    h5: {
      fontFamily: font.style.fontFamily,
      fontSize: "23px",
      fontWeight: 400,
      lineHeight: "32px",
    },
    h6: {
      fontFamily: font.style.fontFamily,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "33.6px",
    },
    subtitle1: {
      fontFamily: font.style.fontFamily,
    },
    subtitle2: {
      fontFamily: font.style.fontFamily,
    },
    body1: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: "0.5px",
    },
    body2: {
      fontFamily: font.style.fontFamily,
    },
    button: {
      fontFamily: font.style.fontFamily,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "36px",
      textTransform: "uppercase" as const,
    },
    caption: {
      fontFamily: font.style.fontFamily,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    overline: {
      fontFamily: font.style.fontFamily,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "32px",
      letterSpacing: "2px",
      textTransform: "uppercase" as const,
    },
  };
};
