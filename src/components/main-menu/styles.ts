import { type SxProps } from "@mui/material";

import { styles as navbarStyles } from "~/components/navbar/styles.js";
import { breakpoints, theme } from "~/styles/theme.js";

export const styles = {
  dialog: {
    "& .MuiDialog-paper": {
      justifyContent: "space-between",
      backgroundColor: theme.palette.background.paper,
      backgroundImage: "unset",
    },
  },
  dialogLogo: {
    display: "none",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  buttonWrapper: {
    alignItems: "flex-end",
    pt: 3,
    pr: 3,
    width: "100vw",
  },
  menuButtonContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    pl: 4,
    pr: 4,
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 2,
      pr: 2,
    },
  },
  startGame: { mb: 12 },
  menuButton: {
    width: "fit-content",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    "&:hover .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
  },
  menuList: {
    display: "flex",
    alignItems: "flex-start",
    "&:hover .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
  },
  header: {
    pt: 3,
    pl: 3,
    pr: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 2,
      pr: 2,
      pt: 2,
    },
  },
  footer: {
    pl: 7,
    pr: 3,
    pb: 5,
    flexDirection: "row",
    gap: "78px",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      pl: 2,
      pr: 2,
      pb: 2,
    },
  },
  group: {
    display: "grid",
    textAlign: "center",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "1fr",
    gridGap: "16px",
    alignItems: "center",
    [`@media (max-width: ${breakpoints.sm}px)`]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gridGap: "16px",
      width: "100%",
    },
  },
  textButton: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  } satisfies SxProps,
  ...navbarStyles,
};
