import { type FC, type ReactNode } from "react";
import { CssBaseline, ThemeProvider as Provider } from "@mui/material";

import { theme } from "./theme.js";

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};
