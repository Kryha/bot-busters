import { type FC } from "react";
import { Slide, Stack } from "@mui/material";
import { type PlayerType, type FECharacterName } from "~/types/index.js";

import { SplashScreen } from "~/components/index.js";
import { LetsBustSomeBots, StartChatting } from "~/assets/icons/index.js";
import { CHARACTERS } from "~/constants/index.js";

import {
  getCharacterSplashScreen,
  getCharacterTitle,
} from "~/utils/characters.jsx";

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
  const characterName = name as FECharacterName;
  const backgroundColor = `${color}.main`;
  const characterSplashScreen = getCharacterSplashScreen(characterName);
  const characterTitle = getCharacterTitle(characterName);

  return (
    <>
      {splashScreenVariant === "chat" && (
        <SplashScreen
          characterName={characterName}
          backgroundColor={backgroundColor}
        >
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
