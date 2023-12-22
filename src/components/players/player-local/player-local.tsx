import { type FC } from "react";
import { Stack } from "@mui/material";

import { Player } from "~/components/index.js";
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
      <Player character={character} isLocalPlayer={true} />
    </Stack>
  );
};
