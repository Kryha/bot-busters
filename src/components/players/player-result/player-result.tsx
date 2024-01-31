import { type FC } from "react";
import { Stack } from "@mui/material";
import { type PlayerType } from "~/types/index.js";
import { Player } from "~/components/index.js";
import { CHARACTERS } from "~/constants/index.js";

import { styles } from "./styles.js";

interface Props {
  player: PlayerType;
  hasGuessed: boolean;
  isSelected: boolean;
  onSelectPlayer?: () => void;
}

export const PlayerResult: FC<Props> = ({
  player,
  hasGuessed,
  isSelected,
  onSelectPlayer,
}) => {
  const character = CHARACTERS[player.characterId]!;

  return (
    <Stack sx={styles.container}>
      <Player
        stage="results"
        character={character}
        hasGuessed={hasGuessed}
        isBot={player.isBot}
        isSelected={isSelected}
        onSelectPlayer={onSelectPlayer}
      />
    </Stack>
  );
};
