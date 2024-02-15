import { Container } from "@mui/material";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { type PlayerType } from "~/types/index.js";
import { Transitions } from "~/components/transitions/index.js";
import { SPLASH_SCREEN_TIME_MS } from "~/constants/index.js";
import { styles } from "./styles.js";

interface Props {
  splashScreenVariant?: "chat" | "voting";
  localPlayer: PlayerType;
  children: ReactNode;
}

export const MatchLayout: FC<Props> = ({
  children,
  splashScreenVariant,
  localPlayer,
}) => {
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  useEffect(() => {
    if (!splashScreenVariant) return;
    setShowSplashScreen(true);
    setTimeout(() => {
      setShowSplashScreen(false);
    }, SPLASH_SCREEN_TIME_MS);
  }, [splashScreenVariant]);

  return (
    <Container component="section" sx={styles.container}>
      {showSplashScreen ? (
        <Transitions
          splashScreenVariant={splashScreenVariant}
          localPlayer={localPlayer}
          showSplashScreen={showSplashScreen}
        />
      ) : (
        children
      )}
    </Container>
  );
};
