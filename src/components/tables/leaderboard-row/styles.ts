import { type SxProps } from "@mui/material";

export const styles = {
  tableRow: (isBlurred?: boolean) => {
    return {
      "&:last-child td, &:last-child th": { border: 0 },
      "& .MuiTableCell-root": { pl: 0 },
      filter: isBlurred ? "blur(2.5px)" : "none",
    };
  },
  container: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  } satisfies SxProps,
};
