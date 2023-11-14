import { Stack, type StackProps } from "@mui/material";
import { useState, type FC, useEffect } from "react";
import { styles } from "./styles";
import { SPLASH_SCREEN_DURATION } from "@/constants";

interface Props extends StackProps {
  show: boolean;
}

export const SplashScreen: FC<Props> = ({ children, show }) => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (show) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
      }, SPLASH_SCREEN_DURATION);
    }
  }, [show]);

  if (!showSplash) return;

  return <Stack sx={styles.container}>{children}</Stack>;
};
