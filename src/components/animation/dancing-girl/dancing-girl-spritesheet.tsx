import React from "react";
import { Box } from "@mui/material";

import { Animation } from "~/components/animation/animation.jsx";
import { useAnimatedSprite } from "~/hooks/use-animated-sprite.js";
import { DancingGirlHips } from "./dancing-girl-hips.jsx";
import { DancingGirlBalancing } from "./dancing-girl-balancing.jsx";
import { DancingGirlSlides } from "./dancing-girl-slides.jsx";
import { DancingGirlSkips } from "./dancing-girl-skips.jsx";
import { DancingGirlSnaps } from "./dancing-girl-snaps.jsx";

import { styles } from "./styles.js";

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
        <Animation
          key={sprite.id}
          id={sprite.id}
          scale={controls.scale}
          xlinkHref={sprite.xlinkHref}
        />
      ))}
    </Box>
  );
};
