import React, { type FC, useState } from "react";
import Box from "@mui/material/Box";

import { useAnimatedSprite } from "@/hooks/use-animated-sprite";
import { DEFAULT_SPRITE_SCALE } from "@/features/animation/constants";
import { DancingGirlHips } from "@/features/animation/dancing-girl/dancing-girl-hips";
import { DancingGirlBalancing } from "@/features/animation/dancing-girl/dancing-girl-balancing";
import { DancingGirlSlides } from "@/features/animation/dancing-girl/dancing-girl-slides";
import { DancingGirlSkips } from "@/features/animation/dancing-girl/dancing-girl-skips";
import { DancingGirlSnaps } from "@/features/animation/dancing-girl/dancing-girl-snaps";

export const styles = {
  spriteRow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  spriteLayout: {
    display: "flex",
    justifyContent: "space-between", // Adjust as needed
    alignItems: "center",
  },
  sprite: {
    transformOrigin: "center center",
    display: "flex",
    justifyContent: "space-evenly",
    width: 100,
    height: 100,
    "&:hover": {
      border: "1px solid red",
    },
  },
};

interface AnimatedDanceMoveProps {
  id: string;
  xlinkHref: string;
  animatedSymbolRef?: React.RefObject<SVGUseElement>;
  width?: number;
  height?: number;
  scale: number;
}
const AnimatedSprite: FC<AnimatedDanceMoveProps> = ({
  id,
  xlinkHref,
  animatedSymbolRef,
  scale,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const onClick = () => {
    setClicked(!clicked);
  };
  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  const hoverScale = DEFAULT_SPRITE_SCALE * scale;

  return (
    <svg
      style={{
        ...styles.sprite,
        transform: hovered ? `scale(${hoverScale})` : `scale(${scale})`,
        border: hovered ? "1px solid red" : "",
      }}
      key={id}
      aria-labelledby={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use xlinkHref={xlinkHref} ref={animatedSymbolRef} />
    </svg>
  );
};

export const DancingGirlSpriteSheet: React.FC = () => {
  const controls = useAnimatedSprite({
    spriteSheetFrames: 8,
  });

  const sprites = [
    {
      id: "hips",
      xlinkHref: `#hips${controls.currentFrame + 1}`,
      label: "Hips",
    },
    {
      id: "balancing",
      xlinkHref: `#balancing${controls.currentFrame + 1}`,
      label: "Balancing",
    },
    {
      id: "slide",
      xlinkHref: `#slide${controls.currentFrame + 1}`,
      label: "Slide",
    },
    {
      id: "skip",
      xlinkHref: `#skip${controls.currentFrame + 1}`,
      label: "Skip",
    },
    {
      id: "snap",
      xlinkHref: `#snap${controls.currentFrame + 1}`,
      label: "Snap",
    },
    {
      id: "hips",
      xlinkHref: `#hips${controls.currentFrame + 1}`,
      label: "Hips",
    },
    {
      id: "balancing",
      xlinkHref: `#balancing${controls.currentFrame + 1}`,
      label: "Balancing",
    },
    {
      id: "slide",
      xlinkHref: `#slide${controls.currentFrame + 1}`,
      label: "Slide",
    },
    {
      id: "skip",
      xlinkHref: `#skip${controls.currentFrame + 1}`,
      label: "Skip",
    },
    {
      id: "snap",
      xlinkHref: `#snap${controls.currentFrame + 1}`,
      label: "Snap",
    },
    {
      id: "hips",
      xlinkHref: `#hips${controls.currentFrame + 1}`,
      label: "Hips",
    },
    {
      id: "balancing",
      xlinkHref: `#balancing${controls.currentFrame + 1}`,
      label: "Balancing",
    },
    {
      id: "slide",
      xlinkHref: `#slide${controls.currentFrame + 1}`,
      label: "Slide",
    },
    {
      id: "skip",
      xlinkHref: `#skip${controls.currentFrame + 1}`,
      label: "Skip",
    },
  ];

  return (
    <Box component="div" sx={styles.spriteLayout}>
      <DancingGirlHips />
      <DancingGirlBalancing />
      <DancingGirlSlides />
      <DancingGirlSkips />
      <DancingGirlSnaps />
      {sprites.map((sprite) => (
        <AnimatedSprite
          key={sprite.id}
          id={sprite.id}
          scale={controls.scale}
          xlinkHref={sprite.xlinkHref}
        />
      ))}
    </Box>
  );
};
