import { Box } from "@mui/material";
import { type FC } from "react";
import { PlayButtonAnimation } from "~/assets/animations/index.js";
import { AnimationPlayer } from "~/components/animation/index.js";
import { styles } from "./styles.js";
import { usePlaySFX } from "~/hooks/sounds.js";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const PlayButton: FC<Props> = ({ onClick, disabled }) => {
  const segments = [
    [0, 96],
    [24, 96],
  ];
  const playSfx = usePlaySFX();

  const handleClick = () => {
    playSfx("PlayButton");
    onClick();
  };

  return (
    <Box
      component={"button"}
      onClick={handleClick}
      disabled={disabled}
      aria-label={"Start"}
      sx={styles.playButton}
    >
      <AnimationPlayer
        animationData={PlayButtonAnimation}
        segments={segments}
        play
        loop
      />
    </Box>
  );
};
