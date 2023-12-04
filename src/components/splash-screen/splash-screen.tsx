import { Stack } from "@mui/material";
import { useState, type FC, useEffect, type ReactNode } from "react";

import { SPLASH_SCREEN_DURATION } from "~/constants/index.js";

import { styles } from "./styles.js";

interface Props {
  children: ReactNode;
}

export const SplashScreen: FC<Props> = ({ children }) => {
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  useEffect(() => {
    setShowSplashScreen(true);
    setTimeout(() => {
      setShowSplashScreen(false);
    }, SPLASH_SCREEN_DURATION);
  }, []);

  if (!showSplashScreen) return;

  return <Stack sx={styles.container}>{children}</Stack>;
};
