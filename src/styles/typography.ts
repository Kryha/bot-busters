import { type Typography } from "@mui/material/styles/createTypography.js";
import { PT_Serif } from "next/font/google";
import { COEFFICIENT, FONT_SIZE } from "~/constants/index.js";
import localFont from "next/font/local";

const ptSerif = PT_Serif({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const disposableDigi = localFont({
  src: [
    {
      path: "./fonts/dispdigibb/DisposableDigiBB_italics.otf",
      weight: "400",
      style: "italic",
    },
  ],
});

const eightBitDigi = localFont({
  src: [
    {
      path: "./fonts/8bit16.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const appleIIPro = localFont({
  src: [
    {
      path: "./fonts/AppleII.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const typography = (): Typography => {
  const coefficient = FONT_SIZE / COEFFICIENT;
  const pxToRem = (px: number) => `${(px / FONT_SIZE) * coefficient}rem`;

  return {
    fontFamily: appleIIPro.style.fontFamily,
    fontSize: FONT_SIZE,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    pxToRem: pxToRem,
    h1: {
      fontFamily: disposableDigi.style.fontFamily,
      fontSize: "clamp(3.0rem, 7.4vw + 1rem, 7rem);", //150px
      lineHeight: "clamp(5rem, 9.4vw + 1rem, 8rem);", //
      color: "#FF8400 !important",
      textTransform: "uppercase" as const,
    },
    h2: {
      fontSize: "clamp(3.0rem, 7.4vw + 1rem, 7rem);", //110px
      lineHeight: "clamp(5rem, 9.4vw + 1rem, 8rem);",
      fontFamily: disposableDigi.style.fontFamily,
      fontWeight: 400,
      textTransform: "uppercase" as const,
    },
    h3: {
      fontFamily: eightBitDigi.style.fontFamily,
      fontSize: "clamp(1.5rem, 2vw + 1rem, 3rem);",
      fontWeight: 400,
      lineHeight: "49.65px",
      textTransform: "uppercase" as const,
    },
    h4: {
      fontFamily: eightBitDigi.style.fontFamily,
      fontSize: "clamp(0.5rem, 2vw + 1rem, 2rem);",
      fontWeight: 400,
      lineHeight: "38.1px",
      textTransform: "uppercase" as const,
    },
    h5: {
      fontFamily: appleIIPro.style.fontFamily,
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: "72.09px",
    },
    h6: {
      fontFamily: appleIIPro.style.fontFamily,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "33.6px",
    },
    subtitle1: {
      // top ranked title
      fontFamily: disposableDigi.style.fontFamily,
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: "49.65px",
      letterSpacing: "-5%",
      textTransform: "uppercase" as const,
    },
    subtitle2: {
      // top ranked positions
      fontFamily: appleIIPro.style.fontFamily,
      fontSize: pxToRem(20),
      fontWeight: 400,
      lineHeight: "53.5px",
    },
    body1: {
      // normal text
      fontFamily: appleIIPro.style.fontFamily,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "normal",
    },
    body2: {
      // leaderboard
      fontFamily: appleIIPro.style.fontFamily,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "normal",
    },
    button: {
      fontFamily: eightBitDigi.style.fontFamily,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "18.75px",
      textTransform: "uppercase" as const,
    },
    caption: {
      fontFamily: appleIIPro.style.fontFamily,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    overline: {
      // top ranked points
      fontFamily: ptSerif.style.fontFamily,
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "25.88px",
      letterSpacing: "1%",
      textTransform: "uppercase" as const,
    },
  };
};
