import { type FC } from "react";
import { Avatar, Stack } from "@mui/material";
import { type PlayerType } from "~/types/index.js";

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

export const Interstitials: FC<Props> = ({
  splashScreenVariant,
  localPlayer,
}) => {
  const character = CHARACTERS[localPlayer.characterId];
  const { name, color } = character;
  const backgroundColor = `${color}.main`;
  const characterSplashScreen = getCharacterSplashScreen(name);
  const characterTitle = getCharacterTitle(name);

  return (
    <>
      {splashScreenVariant === "chat" && (
        <SplashScreen backgroundColor={backgroundColor}>
          <Avatar src={characterSplashScreen.src} sx={styles.avatar} />
          <Stack sx={styles.splashText}>
            <StartChatting aria-label={"start-chatting"} />
            <Stack sx={styles.splashHeading}>{characterTitle}</Stack>
          </Stack>
        </SplashScreen>
      )}
      {splashScreenVariant === "voting" && (
        <SplashScreen backgroundColor={theme.palette.purple.dark}>
          <Stack sx={styles.splashText}>
            <LetsBustSomeBots aria-label={"voting-stage"} />
          </Stack>
        </SplashScreen>
      )}
    </>
  );
};
