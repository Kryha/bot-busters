import { Slide, Stack } from "@mui/material";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { SPLASH_SCREEN_DURATION } from "~/constants/index.js";
import { styles } from "./styles.js";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

// TODO: Splash screen timing should not overlap the chat stage timer
export const SplashScreen: FC<Props> = ({ children, backgroundColor }) => {
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  useEffect(() => {
    setShowSplashScreen(true);
    setTimeout(() => {
      setShowSplashScreen(false);
    }, SPLASH_SCREEN_DURATION);
  }, []);

  if (!showSplashScreen) return;

  return (
    <Slide direction="left" in={showSplashScreen} mountOnEnter unmountOnExit>
      <Stack sx={styles.container(backgroundColor)}>{children}</Stack>
    </Slide>
  );
};
