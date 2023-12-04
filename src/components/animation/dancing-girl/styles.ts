export const styles = {
  spriteRow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  spriteLayout: {
    display: "flex",
    justifyContent: "space-between", // Adjust as needed
    alignItems: "center",
  },
  sprite: {
    transformOrigin: "center center",
    display: "flex",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    "&:hover": {
      border: "1px solid red",
    },
  },
};
