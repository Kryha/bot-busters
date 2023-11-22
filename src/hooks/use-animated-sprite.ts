import { useEffect } from "react";
import { useControls } from "leva";

interface AnimatedSpriteHookOptions {
  spriteSheetFrames: number;
}

export const useAnimatedSprite = ({
  spriteSheetFrames,
}: AnimatedSpriteHookOptions) => {
  const [controls, set] = useControls(() => ({
    scale: {
      label: "Scale",
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    fps: {
      label: "FPS (frames per second)",
      value: 0,
    },
    speed: {
      label: "Speed",
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    currentFrame: {
      label: "Current Frame",
      value: 1,
      min: 1,
      max: spriteSheetFrames,
      step: 1,
    },
    play: {
      label: "Play | Pause",
      value: true,
    },
  }));

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const totalAnimationTimeInSeconds = 1 / controls.speed;
    const calculatedFrameTime =
      (totalAnimationTimeInSeconds * 1000) / spriteSheetFrames;

    const animateSprite = () => {
      set({
        currentFrame: (controls.currentFrame + 1) % spriteSheetFrames,
        fps: 1 / (calculatedFrameTime / 1000),
      });
    };

    if (controls.play) {
      intervalId = setInterval(animateSprite, calculatedFrameTime);
    }

    return () => clearInterval(intervalId);
  }, [controls, spriteSheetFrames, set]);

  return controls;
};
