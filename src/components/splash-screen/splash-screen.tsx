import { Stack, type StackProps } from "@mui/material";
import { useState, type FC, useEffect } from "react";

import { SPLASH_SCREEN_DURATION } from "~/constants/index.js";

import { styles } from "./styles.js";

interface Props extends StackProps {
  show: boolean;
}

export const SplashScreen: FC<Props> = ({ children, show }) => {
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  useEffect(() => {
    if (show) {
      setShowSplashScreen(true);
      setTimeout(() => {
        setShowSplashScreen(false);
      }, SPLASH_SCREEN_DURATION);
    }
  }, [show]);

  if (!showSplashScreen) return;

  return <Stack sx={styles.container}>{children}</Stack>;
};
