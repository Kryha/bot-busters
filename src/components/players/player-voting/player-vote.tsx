import { type FC } from "react";
import { Stack } from "@mui/material";
import { Player } from "~/components/index.js";

import { type Character } from "~/types/index.js";
import { styles } from "./styles.js";

interface Props {
  character: Character;
  isSelected?: boolean;
  onSelectPlayer: () => void;
}

export const PlayerVote: FC<Props> = ({
  character,
  isSelected,
  onSelectPlayer,
}) => {
  return (
    <Stack sx={styles.container}>
      <Player
        stage="voting"
        character={character}
        isSelected={isSelected}
        onSelectPlayer={onSelectPlayer}
      />
    </Stack>
  );
};
