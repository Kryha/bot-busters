import { theme } from "~/styles/index.js";

export const styles = {
  container: {
    flexDirection: "column",
  },
  menu: {
    borderRadius: 0,
    border: `4px solid ${theme.palette.customGrey.main}`,
  },
  menuItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
  },
};
