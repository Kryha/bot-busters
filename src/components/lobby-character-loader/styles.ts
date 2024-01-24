import { breakpoints, theme } from "~/styles/theme.js";

export const styles = {
  container: {
    justifyContent: "center",
    gap: 4,
    flexDirection: "column",
    height: "100%",
    [theme.breakpoints.up("xl")]: {
      gap: 6,
    },
  },
  characterList: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    flex: 1,
  },
  character: (activatedIndices: Set<number>, index: number) => {
    const isActivated = activatedIndices.has(index);
    const additionalStyles = isActivated
      ? {}
      : {
          fill: theme.palette.customGrey.main,
          stroke: theme.palette.customGrey.main,
        };

    return {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "200px",
      height: "200px",
      [theme.breakpoints.up("xl")]: {
        width: "250px",
        height: "250px",
      },
      [theme.breakpoints.down("md")]: {
        width: "150px",
        height: "150px",
      },
      "& > svg": {
        width: "100%",
        height: "100%",
        preserveAspectRatio: "xMidYMid meet",
        "& > path ": {
          ...additionalStyles,
        },
      },
    };
  },
  text: {
    textTransform: "uppercase",
    fontSize: "16px",
    [`@media (min-width: ${breakpoints.lg}px)`]: {
      fontSize: "24px",
    },
    [`@media (min-width: ${breakpoints.xl}px)`]: {
      fontSize: "32px",
    },
  },
  hostContainer: {
    flexDirection: "row",
    flex: 1,
  },
  hostAvatar: {
    alignSelf: "flex-end",
    width: "auto",
    height: 250,
    [theme.breakpoints.up("lg")]: {
      height: 400,
    },
    "& > img": {
      width: "inherit",
      height: "inherit",
    },
  },
  hostParagraph: {
    flexDirection: "column",
    justifyContent: "center",
  },
  hostText: {
    lineHeight: "24px",
    justifyContent: "flex-end",
    alignSelf: "center",
    width: "70%",
    "& > span": {
      color: theme.palette.secondary.main,
      textTransform: "uppercase",
    },
  },
};
