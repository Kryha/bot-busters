import { Slide, Stack } from "@mui/material";
import { type FC, useEffect } from "react";
import { type PlayerType } from "~/types/index.js";

import { LetsBustSomeBots, StartChatting } from "~/assets/icons/index.js";
import { SplashScreen } from "~/components/index.js";
import { CHARACTERS } from "~/constants/index.js";

import {
  getCharacterSplashScreen,
  getCharacterTitle,
} from "~/utils/characters.jsx";

import { usePlaySFX } from "~/hooks/sounds.js";
import { theme } from "~/styles/index.js";
import { styles } from "./styles.js";

interface Props {
  splashScreenVariant?: "chat" | "voting";
  localPlayer: PlayerType;
}

// TODO: works. To be refactored
export const Interstitials: FC<Props> = ({
  splashScreenVariant,
  localPlayer,
}) => {
  const character = CHARACTERS[localPlayer.characterId];
  const { name, color } = character;
  const backgroundColor = `${color}.main`;
  const characterSplashScreen = getCharacterSplashScreen(name);
  const characterTitle = getCharacterTitle(name);
  const playSfx = usePlaySFX();

  useEffect(() => {
    const filepath =
      splashScreenVariant === "chat" ? "StartChatting" : "LetsBustSomeBots";

    if (filepath) void playSfx(filepath);
  }, [playSfx, splashScreenVariant]);

  return (
    <>
      {splashScreenVariant === "chat" && (
        <SplashScreen characterName={name} backgroundColor={backgroundColor}>
          <Stack sx={styles.splashSection}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
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
        <SplashScreen backgroundColor={theme.palette.purple.dark}>
          <Stack sx={styles.splashSection}>
            <Stack sx={styles.letsBustSomeBots}>
              <LetsBustSomeBots aria-label={"voting-stage"} />
            </Stack>
          </Stack>
        </SplashScreen>
      )}
    </>
  );
};
