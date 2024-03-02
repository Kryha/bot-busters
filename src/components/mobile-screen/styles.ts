import { breakpoints, theme } from "~/styles/index.js";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  aleoSystems: {
    marginTop: 4,
    color: theme.palette.primary.main,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    pl: 3,
    pr: 3,
    [`@media (max-width: ${breakpoints.md}px)`]: {
      pl: 0,
      pr: 0,
    },
  },
  text: {
    marginTop: 4,
    textAlign: "center",
    width: "70%",
    color: theme.palette.primary.main,
  },
  image: {
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "50%",
    display: "flex",
  },
};
