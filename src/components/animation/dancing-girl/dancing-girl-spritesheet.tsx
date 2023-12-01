import React from "react";
import Box from "@mui/material/Box";
import { useAnimatedSprite } from "~/hooks/use-animated-sprite";
import { DancingGirlHips } from "~/components/animation/dancing-girl/dancing-girl-hips";
import { DancingGirlBalancing } from "~/components/animation/dancing-girl/dancing-girl-balancing";
import { DancingGirlSlides } from "~/components/animation/dancing-girl/dancing-girl-slides";
import { DancingGirlSkips } from "~/components/animation/dancing-girl/dancing-girl-skips";
import { DancingGirlSnaps } from "~/components/animation/dancing-girl/dancing-girl-snaps";
import { styles } from "./styles";
import { Animation } from "~/components/animation/animation";

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
