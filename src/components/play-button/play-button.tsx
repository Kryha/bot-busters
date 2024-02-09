import { Box } from "@mui/material";
import { type FC } from "react";
import { PlayButtonAnimation } from "~/assets/animations/index.js";
import { AnimationPlayer } from "~/components/animation/index.js";
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
  return (
    <Box
      component={"button"}
      onClick={onClick}
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
