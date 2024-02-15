import { Slide, Stack } from "@mui/material";
import { type FC, useEffect, useState } from "react";
import { usePlayMusic, usePlaySFX } from "~/hooks/sounds.js";

import { type PlayerType } from "~/types/index.js";
import { LetsBustSomeBots, StartChatting } from "~/assets/icons/index.js";
import { SplashScreen } from "~/components/index.js";

import {
  getCharacterSplashScreen,
  getCharacterTitle,
} from "~/utils/characters.jsx";
import { CHARACTERS, SPLASH_SCREEN_TEXT_DURATION } from "~/constants/index.js";

import { pages } from "~/router.js";
import { theme } from "~/styles/index.js";
import { styles } from "./styles.js";

interface Props {
  splashScreenVariant?: "chat" | "voting";
  localPlayer: PlayerType;
  showSplashScreen: boolean;
}

export const Transitions: FC<Props> = ({
  splashScreenVariant,
  localPlayer,
  showSplashScreen,
}) => {
  const [showLabel, setShowLabel] = useState(false);
  const playSfx = usePlaySFX();

  const character = CHARACTERS[localPlayer.characterId];
  const { name, color } = character;
  const backgroundColor = `${color}.main`;
  const characterSplashScreen = getCharacterSplashScreen(name);
  const characterTitle = getCharacterTitle(name);

  const track =
    splashScreenVariant === "chat" ? "StartChatting" : "LetsBustSomeBots";

  usePlayMusic("Transition", false, pages.match, 0);

  useEffect(() => {
    if (!splashScreenVariant) return;
    setShowLabel(false);
    setTimeout(() => {
      playSfx(track);
      setShowLabel(true);
    }, SPLASH_SCREEN_TEXT_DURATION);
  }, [track, playSfx, splashScreenVariant]);

  return (
    <>
      {splashScreenVariant === "chat" && (
        <SplashScreen
          showSplashScreen={showSplashScreen}
          characterName={name}
          backgroundColor={backgroundColor}
        >
          <Stack sx={styles.splashSection}>
            <Slide direction="left" in={showLabel} mountOnEnter unmountOnExit>
              <Stack sx={styles.splashText}>
                <StartChatting aria-label={"start-chatting"} />
                <Stack sx={styles.splashHeading}>{characterTitle}</Stack>
              </Stack>
            </Slide>
            <Stack sx={styles.avatar}>{characterSplashScreen}</Stack>
          </Stack>
        </SplashScreen>
      )}
      {splashScreenVariant === "voting" && (
        <SplashScreen
          showSplashScreen={showSplashScreen}
          backgroundColor={theme.palette.purple.dark}
        >
          <Stack sx={styles.splashSection}>
            <Slide direction="left" in={showLabel} mountOnEnter unmountOnExit>
              <Stack sx={styles.letsBustSomeBots}>
                <LetsBustSomeBots aria-label={"voting-stage"} />
              </Stack>
            </Slide>
            ,
          </Stack>
        </SplashScreen>
      )}
    </>
  );
};
