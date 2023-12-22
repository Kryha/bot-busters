import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { Player } from "~/components/index.js";
import { text } from "~/assets/text/index.js";
import { type PlayerType } from "~/types/index.js";
import { CHARACTERS } from "~/constants/index.js";

import { styles } from "./styles.js";

interface Props {
  localPlayer: PlayerType;
}

export const PlayerLocal: FC<Props> = ({ localPlayer }) => {
  const character = CHARACTERS[localPlayer.characterId];
  return (
    <Stack sx={styles.container}>
      <Typography variant="body1">{text.match.inThisChat}</Typography>
      <Player character={character} />
    </Stack>
  );
};
