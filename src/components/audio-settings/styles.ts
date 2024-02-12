import { theme } from "~/styles/index.js";

export const styles = {
  container: {
    flexDirection: "column",
  },
  menu: {
    borderRadius: 0,
    border: `4px solid ${theme.palette.customGrey.main}`,
  },
  resetButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
  },
  button: {
    fontSize: 16,
    lineHeight: "normal",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  menuItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: "normal",
  },
};
