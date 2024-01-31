import { BotBustersLogo } from "~/assets/animations/index.js";
import { AnimationPlayer } from "~/components/animation/index.js";

export const BotBusterLogoAnimation = () => {
  const segments = [
    [0, 96],
    [47, 96],
  ];

  return (
    <AnimationPlayer
      animationData={BotBustersLogo}
      segments={segments}
      play
      loop
      style={{ width: 800, height: 220 }}
    />
  );
};
