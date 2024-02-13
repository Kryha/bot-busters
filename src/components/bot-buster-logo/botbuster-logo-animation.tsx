import { AnimationPlayer } from "~/components/animation/index.js";
import { BOTBUSTERS_LOGO_ANIMATION_SEGMENT } from "~/constants/index.js";
import { BotBustersLogo } from "~/assets/animations/index.js";

export const BotBusterLogoAnimation = () => {
  return (
    <AnimationPlayer
      animationData={BotBustersLogo}
      segments={BOTBUSTERS_LOGO_ANIMATION_SEGMENT}
      play
      loop
      style={{ width: 800, height: 220 }}
    />
  );
};
