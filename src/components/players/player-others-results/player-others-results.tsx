import { type PlayerType } from "~/types/index.js";
import { type FC } from "react";
import { CHARACTERS } from "~/constants/index.js";
import { Box, Stack, Typography } from "@mui/material";
import { text } from "~/assets/text/index.js";
import { BotArrowIcon } from "~/assets/icons/index.js";

import { styles } from "./styles.js";

interface Props {
  otherPlayers: PlayerType[];
  viewResults: string | undefined;
}
export const PlayerOthersResults: FC<Props> = ({
  otherPlayers,
  viewResults,
}) => {
  const playerResult = otherPlayers.find(
    (player) => player.characterId === viewResults,
  );

  const isBot = playerResult?.isBot;
  const character = playerResult
    ? CHARACTERS[playerResult.characterId]
    : undefined;

  const textColor = `${character?.color}.main`;

  return (
    <Stack sx={styles.playerResults}>
      <Stack sx={styles.resultsHeading}>
        <Typography variant="body1" color={textColor}>
          <Box component={"span"}>{character?.name} </Box>
          {isBot ? text.match.resultBotTitle : text.match.resultHumanTitle}
        </Typography>
      </Stack>
      <Stack sx={styles.proof}>
        <Typography variant="body1">
          {isBot ? text.match.resultBot : text.match.resultHuman}
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
