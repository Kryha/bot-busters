import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { Player } from "~/components";
import { text } from "~/assets/text";
import { type PlayerType } from "~/server/api/match-types.js";
import { styles } from "./styles.js";
import { CHARACTERS } from "~/constants";

interface Props {
  localPlayer: PlayerType;
}

export const PlayerLocal: FC<Props> = ({ localPlayer }) => {
  const character = CHARACTERS[localPlayer.characterId];
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{text.match.inThisChat}</Typography>
      <Player characterName={character.name} color={character.color} />
    </Stack>
  );
};
