import { type SxProps } from "@mui/material";

export const styles = {
  formControl: {
    mb: 5,
    minWidth: "650px",
    width: "51.6vw",
    maxWidth: "60vw",
    borderRadius: "4px",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.20)",
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  select: { mt: 1 },
  menuList: { p: 0 },
  menuItem: { p: 2 } satisfies SxProps,
};
