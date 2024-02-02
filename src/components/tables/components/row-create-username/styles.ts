import { type SxProps } from "@mui/material";
import { zIndex } from "~/styles/z-index.js";

export const styles = {
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    "& .MuiTableCell-root": { pl: 0 },
    gap: 1,
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: zIndex.middle,
    left: "8.6%",
    alignItems: "center",
    height: "100vh",
  },
  tableCell: { filter: "blur(2.5px)" },
  select: { borderBottom: "none" },
  wrapper: {
    alignItems: "center",
  },
  avatar: {
    bgcolor: "common.white",
  },
  input: {
    minWidth: "90vw",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.20)",
    borderRadius: 1,
    "& .MuiOutlinedInput-root": {
      "& input": {
        p: "10.5px 12px",
      },
      "& fieldset": {
        border: "none",
      },
    },
  },
  button: {
    borderRadius: 1,
    height: "fit-content",
    p: "4px 16px !important",
    // TODO: define color in theme
    backgroundColor: "#1976D2",
  },
  buttonText: { whiteSpace: "nowrap", overflow: "hidden" },
  container: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    filter: "blur(2.5px)",
  } satisfies SxProps,
};
