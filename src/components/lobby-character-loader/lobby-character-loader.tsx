import { type FC, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { getCharacterAvatar } from "~/utils/characters.jsx";
import { CHARACTERS, DEFAULT_MAX_PLAYERS_PER_ROOM } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";
import { LobbyProgressBar } from "~/components/lobby-progress-bar/index.js";
import { HostAvatar } from "~/assets/characters/index.js";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

interface Props {
  playerQueuePosition: number;
  queueLength: number;
  matchReady: boolean;
}

const MATCH_READY_SET = new Set<number>([1, 2, 3, 4, 5]);

export const LobbyCharacterLoader: FC<Props> = ({
  playerQueuePosition,
  queueLength,
  matchReady,
}) => {
  const [activatedCharacters, setActivatedCharacters] = useState(
    new Set<number>(),
  );

  useEffect(() => {
    if (matchReady) {
      setActivatedCharacters(MATCH_READY_SET);
      return;
    }

    if (
      playerQueuePosition === 0 ||
      playerQueuePosition > DEFAULT_MAX_PLAYERS_PER_ROOM
    ) {
      setActivatedCharacters(new Set());
      return;
    }

    const newSet = new Set<number>();
    const upperLimit = Math.min(queueLength, DEFAULT_MAX_PLAYERS_PER_ROOM);
    for (let i = 1; i <= upperLimit; i++) {
      newSet.add(i);
    }

    setActivatedCharacters(newSet);
  }, [matchReady, playerQueuePosition, queueLength]);

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.characterList}>
        {Object.values(CHARACTERS).map(({ name, color, id }) => (
          <Stack
            key={id}
            sx={styles.character(activatedCharacters, Number(id))}
          >
            <Typography
              variant="h3"
              sx={styles.text}
              color={
                activatedCharacters.has(Number(id))
                  ? `${color}.main`
                  : theme.palette.customGrey.main
              }
            >
              {activatedCharacters.has(Number(id))
                ? name
                : text.lobby.searching}
            </Typography>
            {getCharacterAvatar(name)}
          </Stack>
        ))}
      </Stack>
      <LobbyProgressBar progress={activatedCharacters.size} />
      <Stack sx={styles.hostContainer}>
        <Stack sx={styles.hostAvatar}>
          <HostAvatar />
        </Stack>
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
