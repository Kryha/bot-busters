import { type FC, useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router.js";
import { getCharacterAvatar } from "~/utils/characters.jsx";
import { CHARACTERS, DEFAULT_MAX_PLAYERS_PER_ROOM } from "~/constants/index.js";
import { LobbyProgressBar } from "~/components/lobby-progress-bar/index.js";
import { usePlayMusic, usePlaySFX } from "~/hooks/sounds.js";
import { HostAvatar } from "~/assets/characters/index.js";
import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

interface Props {
  playerQueuePosition: number;
  queueLength: number;
}

export const LobbyCharacterLoader: FC<Props> = ({
  playerQueuePosition,
  queueLength,
}) => {
  const [activatedCharacters, setActivatedCharacters] = useState(
    new Set<number>(),
  );

  const router = useRouter();
  const { playMusic, stopMusic, audioContext } = usePlayMusic();
  const playSFX = usePlaySFX();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
  }, [playerQueuePosition, queueLength]);

  useEffect(() => {
    if (router.pathname !== pages.lobby) {
      stopMusic();
    }
    const playMusicOnMouseEnter = () => {
      void audioContext?.resume().then(() => {
        void playSFX("./music/LonelyBot_Loop.mp3", true);
      });
    };

    document.addEventListener("mouseenter", playMusicOnMouseEnter, {
      once: true,
    });
    document.addEventListener("mouseleave", stopMusic);

    return () => {
      document.removeEventListener("mouseenter", playMusicOnMouseEnter);
      document.removeEventListener("mouseleave", stopMusic);
    };
  }, [audioContext, router.pathname]);

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
