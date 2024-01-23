import { type FC, useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { getCharacter } from "~/utils/character.jsx";
import { CHARACTERS } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";

import hostAvatar from "~/assets/characters/host-character.png";
import { styles } from "./styles.js";

interface Props {
  lobbyQueue: number;
}

export const LobbyCharacterLoader: FC<Props> = ({ lobbyQueue }) => {
  const [activatedIndices, setActivatedIndices] = useState(new Set<number>());

  // Update the set of activated indices when lobbyQueue changes
  useEffect(() => {
    setActivatedIndices((prevActivatedIndices) => {
      const newActivatedIndices = new Set(prevActivatedIndices);
      newActivatedIndices.add(lobbyQueue); // Assuming indices start at 0
      return newActivatedIndices;
    });
  }, [lobbyQueue]);

  const characters = Object.values(CHARACTERS).map((character) => ({
    name: character.name,
    color: `${character.color}.dark`,
  }));

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.characterList}>
        {characters.map(({ name, color }, index) => (
          <Stack key={index} sx={styles.character(activatedIndices, index)}>
            <Typography
              variant="body1"
              sx={styles.text(lobbyQueue, index)}
              color={color}
            >
              {name}
            </Typography>
            {getCharacter(name)}
          </Stack>
        ))}
      </Stack>
      <Stack sx={styles.progress}></Stack>
      <Stack sx={styles.hostContainer}>
        <Avatar sx={styles.hostAvatar} src={hostAvatar.src} />
        <Typography variant="caption" sx={styles.hostText}>
          {text.lobby.host}
        </Typography>
      </Stack>
    </Stack>
  );
};
