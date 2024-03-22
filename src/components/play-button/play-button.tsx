import { Box } from "@mui/material";
import { type FC } from "react";
import { PlayButtonAnimation } from "~/assets/animations/index.js";
import { AnimationPlayer } from "~/components/animation/index.js";
import { usePlaySFX } from "~/hooks/sounds.js";
import { PlayButtonDisabled } from "~/assets/icons/index.js";
import { styles } from "./styles.js";

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
      {disabled ? (
        <PlayButtonDisabled width={278} height={118} />
      ) : (
        <AnimationPlayer
          animationData={PlayButtonAnimation}
          segments={segments}
          play
          loop
          style={{ width: 278, height: 118 }}
        />
      )}
    </Box>
  );
};
