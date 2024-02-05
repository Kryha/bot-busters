import { type FC } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { type CharacterId, type PlayerType } from "~/types/index.js";
import { CHARACTERS } from "~/constants/index.js";
import { BotArrowIcon } from "~/assets/icons/index.js";
import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";

interface Props {
  otherPlayers: PlayerType[];
  proofCharacterId: CharacterId;
}

export const PlayerProofs: FC<Props> = ({ otherPlayers, proofCharacterId }) => {
  const playerProof = otherPlayers.find(
    (player) => player.characterId === proofCharacterId,
  );

  if (!playerProof) return <></>;

  const character = CHARACTERS[playerProof.characterId];
  const textColor = `${character.color}.main`;

  return (
    <Stack sx={styles.playerResults}>
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
        <Stack sx={styles.verifyProof}>
          <Typography variant="body1">{text.match.verifyProof}</Typography>
          <BotArrowIcon />
        </Stack>
      </Stack>
    </Stack>
  );
};
