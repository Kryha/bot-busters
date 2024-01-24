import { type FC, useEffect, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { getCharacterAvatar } from "~/utils/characters.jsx";
import { CHARACTERS } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";
import { LobbyProgressBar } from "~/components/lobby-progress-bar/index.js";

import hostAvatar from "~/assets/characters/host-character.png";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

interface Props {
  lobbyQueue: number;
}

export const LobbyCharacterLoader: FC<Props> = ({ lobbyQueue }) => {
  const [activatedCharacters, setActivatedCharacters] = useState(
    new Set<number>(),
  );

  useEffect(() => {
    setActivatedCharacters((prevActivatedCharacters) =>
      new Set(prevActivatedCharacters).add(lobbyQueue),
    );
  }, [lobbyQueue]);

  const characters = Object.values(CHARACTERS).map((character) => ({
    name: character.name,
    color: `${character.color}.dark`,
  }));

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.characterList}>
        {characters.map(({ name, color }, characterIdx) => (
          <Stack
            key={characterIdx}
            sx={styles.character(activatedCharacters, characterIdx)}
          >
            <Typography
              variant="h3"
              sx={styles.text}
              color={
                activatedCharacters.has(characterIdx)
                  ? color
                  : theme.palette.customGrey.main
              }
            >
              {activatedCharacters.has(characterIdx)
                ? name
                : text.lobby.searching}
            </Typography>
            {getCharacterAvatar(name)}
          </Stack>
        ))}
      </Stack>
      <LobbyProgressBar progress={lobbyQueue} />
      <Stack sx={styles.hostContainer}>
        <Avatar sx={styles.hostAvatar} src={hostAvatar.src} />
        <Stack sx={styles.hostParagraph}>
          <Typography variant="body1" sx={styles.hostText}>
            {text.lobby.hostParagraph1}
          </Typography>
          <Typography variant="body1" sx={styles.hostText}>
            {text.lobby.hostParagraph2}
            <Box component={"span"}>{text.lobby.bustSomeBotButt}</Box>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
