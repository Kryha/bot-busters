import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { type PlayerType } from "~/types/index.js";
import { Player } from "~/components/index.js";
import { CHARACTERS } from "~/constants/index.js";

import { styles } from "./styles.js";

interface Props {
  player: PlayerType;
  hasGuessed: boolean;
}

export const PlayerResult: FC<Props> = ({ player, hasGuessed }) => {
  const textResult = player.isBot ? text.match.isBot : text.match.isHuman;

  // TODO: Add colors to theme
  const textColor = hasGuessed ? "#4CAF50" : "#F44336";
  const character = CHARACTERS[player.characterId]!;
  const { name, color } = character;

  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.user}>
        <Player characterName={name} color={color} />
        <Typography variant="body1" color={textColor} sx={styles.text}>
          {textResult}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
