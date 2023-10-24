import { theme } from "@/features/mui/theme";
import { type SxProps } from "@mui/material";

// TODO: delete after deleting component
export const styles = {
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  } satisfies SxProps,
};
