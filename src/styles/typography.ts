import { type Typography } from "@mui/material/styles/createTypography.js";
import { PT_Serif } from "next/font/google";
import { COEFFICIENT, FONT_SIZE } from "~/constants/index.js";
import localFont from "next/font/local";

const overlineFont = PT_Serif({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const headingsFont = localFont({
  src: [
    {
      path: "./fonts/dispdigibb/disposableDigiBB_italics.otf",
      weight: "400",
      style: "italic",
    },
  ],
});

const subHeadingsFont = localFont({
  src: [
    {
      path: "./fonts/eightbit16.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const bodyFont = localFont({
  src: [
    {
      path: "./fonts/appleII.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const typography = (): Typography => {
  const coefficient = FONT_SIZE / COEFFICIENT;
  const pxToRem = (px: number) => `${(px / FONT_SIZE) * coefficient}rem`;

  return {
    fontFamily: bodyFont.style.fontFamily,
    fontSize: FONT_SIZE,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    pxToRem: pxToRem,
    h1: {
      fontFamily: headingsFont.style.fontFamily,
      fontSize: "clamp(3.0rem, 7.4vw + 1rem, 7rem)", //150px
      lineHeight: "clamp(5rem, 9.4vw + 1rem, 8rem)", //
      color: "#FF8400 !important",
      textTransform: "uppercase" as const,
    },
    h2: {
      fontSize: "clamp(3rem, 7.2vw + 1rem, 7rem)", //110px
      lineHeight: "clamp(3rem, 7.2vw + 1rem, 8rem)",
      fontFamily: headingsFont.style.fontFamily,
      fontWeight: 400,
      textTransform: "uppercase" as const,
    },
    h3: {
      fontFamily: subHeadingsFont.style.fontFamily,
      fontSize: "clamp(1.5rem, 0.8vw + 1rem, 3rem);",
      fontWeight: 400,
      lineHeight: "49.65px", // TODO to be converted to rem
      textTransform: "uppercase" as const,
    },
    h4: {
      fontFamily: subHeadingsFont.style.fontFamily,
      fontSize: "clamp(0.5rem, 2vw + 1rem, 2rem);",
      fontWeight: 400,
      lineHeight: "38.1px", // TODO to be converted to rem
      textTransform: "uppercase" as const,
    },
    h5: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: "72.09px", // TODO to be converted to rem
    },
    h6: {
      fontFamily: headingsFont.style.fontFamily,
      fontSize: "42px",
      fontWeight: 400,
    },
    subtitle1: {
      // top ranked title
      fontFamily: headingsFont.style.fontFamily,
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: "49.65px", // TODO to be converted to rem
      textTransform: "uppercase" as const,
    },
    subtitle2: {
      // top ranked positions
      fontFamily: bodyFont.style.fontFamily,
      fontSize: pxToRem(20),
      fontWeight: 400,
      lineHeight: "53.5px", // TODO to be converted to rem
    },
    body1: {
      // normal text
      fontFamily: bodyFont.style.fontFamily,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "normal",
    },
    body2: {
      // larger normal text
      fontFamily: bodyFont.style.fontFamily,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "normal",
    },
    button: {
      fontFamily: subHeadingsFont.style.fontFamily,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "18.75px", // TODO to be converted to rem
      textTransform: "uppercase" as const,
    },
    caption: {
      fontFamily: bodyFont.style.fontFamily,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    overline: {
      // top ranked points
      fontFamily: overlineFont.style.fontFamily,
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "25.88px", // TODO to be converted to rem
      textTransform: "uppercase" as const,
    },
  } as const;
};
