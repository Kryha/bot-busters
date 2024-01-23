import { theme } from "~/styles/theme.js";

export const styles = {
  container: {
    justifyContent: "center",
    gap: 2,
    flexDirection: "column",
  },
  characterList: {
    marginTop: 4,
    justifyContent: "center",
    gap: 2,
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
  text: (lobbyQueue: number, index: number) => {
    return {
      textTransform: "uppercase",
    };
  },
  hostContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  hostAvatar: {
    width: "auto",
    height: 250,
    "& > img": {
      width: "inherit",
      height: "inherit",
    },
  },
  hostText: {},
  progress: {
    background: "green",
    height: "45px",
  },
};
