import { type FC, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { type Character, type MatchStage } from "~/types/index.js";
import {
  getCharacterAnimation,
  getCharacterAvatar,
} from "~/utils/characters.jsx";
import { AnimationPlayer } from "~/components/animation/index.js";
import {
  BOT_BUSTED_ANIMATION_SEGMENT,
  BOT_WIN_ANIMATION_SEGMENT,
} from "~/constants/index.js";
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
  const animation = getCharacterAnimation(character.name, isBot, isSelected);
  const [segments, setSegments] = useState<number[][]>([[]]);

  useEffect(() => {
    if (isBot) {
      const animationSegments = isSelected
        ? BOT_BUSTED_ANIMATION_SEGMENT
        : BOT_WIN_ANIMATION_SEGMENT;
      setSegments(animationSegments);
    }
  }, [isBot, isSelected]);

  return (
    <>
      {stage === "voting" && (
        <Stack
          sx={styles.avatar(stage, isSelected, isBot)}
          onClick={onSelectPlayer}
        >
          {getCharacterAvatar(character.name)}
        </Stack>
      )}
      {stage !== "voting" && (
        <Stack sx={styles.animation(stage, isSelected, isBot)}>
          <AnimationPlayer
            animationData={animation}
            segments={segments}
            play
            loop
          />
        </Stack>
      )}
    </>
  );
};
