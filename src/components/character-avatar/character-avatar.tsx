import { Ash, Dot, Eve, Hal, Roy } from "~/assets/characters";
import { type Character, type MatchStage } from "~/types";
import { type FC } from "react";
import { Stack } from "@mui/material";
import { styles } from "./styles.js";

interface Props {
  character: Character;
  stage?: MatchStage;
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
      {getCharacter(character)}
    </Stack>
  );
};

const getCharacter = (character: Character) => {
  switch (character.name) {
    case "hal":
      return <Hal />;
    case "ash":
      return <Ash />;
    case "roy":
      return <Roy />;
    case "eve":
      return <Eve />;
    case "dot":
      return <Dot />;
    default:
      return <Hal />;
  }
};
