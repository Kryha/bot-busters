import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme";

export const styles = {
  dialog: {
    "& .MuiDialog-paper": {
      justifyContent: "space-between",
    },
  },
  dialogLogo: {
    display: "none",
    "@media (max-width: 600px)": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  mainLogo: {
    "&:hover": {
      "& > svg": {
        "& > path": {
          fill: theme.palette.secondary.main,
        },
      },
    },
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  buttonWrapper: {
    alignItems: "flex-end",
    pt: 3,
    pr: 3,
    width: "100vw",
  },
  button: {
    p: "4px 16px",
  },
  menuButtonContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    pl: 4,
    pr: 4,
    "@media (max-width: 600px)": {
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
  userName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    gap: 2,
  },
  header: {
    pt: 3,
    pl: 3,
    pr: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 600px)": {
      pl: 2,
      pr: 2,
      pt: 2,
    },
  },
  footer: {
    pl: 3,
    pr: 3,
    pb: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 600px)": {
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
    "@media (max-width: 600px)": {
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
};
