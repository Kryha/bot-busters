import { Box, Stack, Typography } from "@mui/material";
import { type FC, useEffect, useRef } from "react";
import { text } from "~/assets/text/index.js";
import { CHARACTERS } from "~/constants/index.js";
import { type CharacterId, type PlayerType } from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  otherPlayers: PlayerType[];
  proofCharacterId?: CharacterId;
  onHoverPlayer: (hovered: boolean) => void;
}

export const PlayerProofs: FC<Props> = ({
  otherPlayers,
  proofCharacterId,
  onHoverPlayer,
}) => {
  // This can never be undefined, set to first player if not found
  const playerProof = otherPlayers.find(
    (player) => player.characterId === proofCharacterId,
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseEnter = () => {
      onHoverPlayer(true);
    };

    if (containerRef.current) {
      const container = containerRef.current;
      container.addEventListener("mouseenter", onMouseEnter);

      return () => {
        container.removeEventListener("mouseenter", onMouseEnter);
      };
    }
  }, [onHoverPlayer]);

  if (!playerProof) return <></>;

  const character = CHARACTERS[playerProof.characterId];
  const textColor = `${character.color}.main`;

  if (!playerProof.isVerified && !playerProof.isBot) {
    return (
      <Stack ref={containerRef} sx={styles.container}>
        <Stack sx={styles.resultsHeading}>
          <Typography variant="body1" color={textColor}>
            <Box component="span">{character.name} </Box>
            {text.match.resultBotHuman}
          </Typography>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack ref={containerRef} sx={styles.container}>
      <Stack sx={styles.resultsHeading}>
        <Typography variant="body1" color={textColor}>
          <Box component="span">{character.name} </Box>
          {playerProof.isBot
            ? text.match.resultBotTitle
            : text.match.resultHumanTitle}
        </Typography>
      </Stack>

      <Stack sx={styles.proof}>
        <Typography variant="body1">
          {playerProof.isBot ? text.match.resultBot : text.match.resultHuman}
        </Typography>

        {/*// TODO: Add proof from server*/}
        {/*<Stack sx={styles.verifyProof}>*/}
        {/*  <Typography variant="body1">{text.match.verifyProof}</Typography>*/}
        {/*  <BotArrowIcon />*/}
        {/*</Stack>*/}
      </Stack>
    </Stack>
  );
};
