import { Stack } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { AnimationPlayer } from "~/components/animation/index.js";
import {
  BOT_BUSTED_ANIMATION_SEGMENT,
  BOT_WIN_ANIMATION_SEGMENT,
} from "~/constants/index.js";
import { usePlaySFX } from "~/hooks/sounds.js";
import { type Character, type MatchStage } from "~/types/index.js";
import {
  getCharacterAnimation,
  getCharacterAvatar,
} from "~/utils/characters.jsx";
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

  const playSfx = usePlaySFX();

  useEffect(() => {
    if (isBot) {
      if (isSelected && isBot) {
        setSegments(BOT_BUSTED_ANIMATION_SEGMENT);
        //TODO: Remove hardcoded values
        void playSfx("./music/voice-over/BotBusted_HeadPop.mp3");
      } else {
        setSegments(BOT_WIN_ANIMATION_SEGMENT);
        void playSfx("./music/voice-over/BotWins.mp3");
      }
    }
  }, [isBot, isSelected, playSfx]);

  return (
    <Stack
      sx={
        stage == "voting"
          ? styles.avatar(stage, isSelected, isBot)
          : styles.animation(stage, isSelected, isBot)
      }
      onClick={onSelectPlayer}
    >
      {stage === "voting" ? (
        getCharacterAvatar(character.name)
      ) : (
        <AnimationPlayer
          animationData={animation}
          segments={segments}
          play
          loop
        />
      )}
    </Stack>
  );
};
