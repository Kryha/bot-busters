import { type FC, type ReactNode, useEffect, useState } from "react";
import { type CharacterName } from "~/types/index.js";
import { Slide, Stack } from "@mui/material";
import { AnimationPlayer } from "~/components/animation/index.js";
import { getTransitionLines } from "~/utils/characters.jsx";
import { SPLASH_SCREEN_DURATION } from "~/constants/index.js";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

interface Props {
  children: ReactNode;
  characterName?: CharacterName;
  backgroundColor?: string;
}

// TODO: Splash screen timing should not overlap the chat stage timer
export const SplashScreen: FC<Props> = ({
  children,
  characterName,
  backgroundColor = theme.palette.purple.dark,
}) => {
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  const transitionLines = getTransitionLines(characterName);

  useEffect(() => {
    setShowSplashScreen(true);
    setTimeout(() => {
      setShowSplashScreen(false);
    }, SPLASH_SCREEN_DURATION);
  }, []);

  if (!showSplashScreen) return;

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Stack sx={styles.container}>
        <Stack sx={styles.transitionLines(backgroundColor)}>
          <AnimationPlayer
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            animationData={transitionLines}
            play
            loop
          />
          {children}
        </Stack>
      </Stack>
    </Slide>
  );
};
