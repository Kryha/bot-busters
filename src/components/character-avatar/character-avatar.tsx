import { type FC } from "react";
import { Stack } from "@mui/material";
import { type Character, type MatchStage } from "~/types/index.js";
import { getCharacterAvatar } from "~/constants/index.js";

import { styles } from "./styles.js";

interface Props {
  character: Character;
  stage: MatchStage;
  isSelected?: boolean;
  hasGuessed?: boolean;
  isBot?: boolean;
  onSelectPlayer?: () => void;
}

export const CharacterAvatar: FC<Props> = ({
  stage,
  character,
  isSelected,
  isBot,
  onSelectPlayer,
}) => {
  return (
    <Stack
      sx={styles.avatar(stage, isSelected, isBot)}
      onClick={onSelectPlayer}
    >
      {getCharacterAvatar(character.name)}
    </Stack>
  );
};
