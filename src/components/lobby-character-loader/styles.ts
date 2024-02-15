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
    [theme.breakpoints.up("xl")]: {
      alignItems: "center",
      flex: 0,
    },
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
      width: "270px",
      height: "270px",
      [theme.breakpoints.up("xl")]: {
        width: "270px",
        height: "270px",
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
    fontSize: "20px",
    [`@media (min-width: ${breakpoints.lg}px)`]: {
      fontSize: "24px",
    },
    [`@media (min-width: ${breakpoints.xl}px)`]: {
      fontSize: "32px",
    },
  },
  hostContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  hostAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "300px",
    maxWidth: "300px",
    minHeight: "200px",
    minWidth: "200px",
  },
  hostParagraph: {
    flexDirection: "column",
    justifyContent: "center",
    width: "60%",
  },
  hostText: {
    lineHeight: "24px",
    "& > span": {
      color: theme.palette.secondary.main,
      textTransform: "uppercase",
    },
  },
};
