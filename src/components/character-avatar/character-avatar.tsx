import { Stack } from "@mui/material";
import { type FC, useEffect, useState } from "react";
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
  const { animation, speed, delay } = getCharacterAnimation(
    character.name,
    isBot,
    isSelected,
  );
  const [segments, setSegments] = useState<number[][]>([[]]);
  const [play, setPlay] = useState(false);

  const playSfx = usePlaySFX();

  const handleSelectPlayer = () => {
    if (onSelectPlayer) {
      playSfx("BlipSelection");
      onSelectPlayer();
    }
  };

  useEffect(() => {
    if (isBot) {
      if (isSelected && isBot) {
        setSegments(BOT_BUSTED_ANIMATION_SEGMENT);
        setTimeout(() => {
          playSfx("BotBustedHeadPop");
          setPlay(true);
        }, delay);
      } else {
        setSegments(BOT_WIN_ANIMATION_SEGMENT);
        setTimeout(() => {
          playSfx("BotWins");
          setPlay(true);
        }, delay);
      }
    } else {
      setPlay(true);
    }
  }, [isBot, isSelected, playSfx, delay]);

  return (
    <Stack
      sx={
        stage == "voting"
          ? styles.avatar(stage, isSelected, isBot)
          : styles.animation(stage, isSelected, isBot)
      }
      onClick={handleSelectPlayer}
    >
      {stage === "voting" && getCharacterAvatar(character.name)}
      {stage === "chat" && (
        <AnimationPlayer
          animationData={animation}
          segments={segments}
          play
          loop
          speed={speed}
        />
      )}

      {stage === "results" && (
        <AnimationPlayer
          animationData={animation}
          segments={segments}
          play={play}
          loop
          speed={speed}
        />
      )}
    </Stack>
  );
};
