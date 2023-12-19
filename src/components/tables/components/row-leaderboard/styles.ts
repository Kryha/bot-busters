import { type SxProps } from "@mui/material";
import { theme } from "~/styles/theme";

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
  },
  tableText: {
    textAlign: "center",
  },
  ranking: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: "24px",
    textAlign: "center",
  } satisfies SxProps,
  avatar: { backgroundColor: "customGrey.main" } satisfies SxProps,
};
