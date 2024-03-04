import { LANDING_PAGE_ANIMATION_SEGMENT } from "~/constants/index.js";
import { AnimationPlayer } from "~/components/index.js";
import { LandingPage } from "~/assets/animations/index.js";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

export const LandingPageAnimation = () => {
  return (
    <AnimationPlayer
      animationData={LandingPage}
      segments={LANDING_PAGE_ANIMATION_SEGMENT}
      background={theme.palette.purple.dark}
      rendererSettings={{ preserveAspectRatio: "xMidYMin slice" }}
      style={styles.container}
      play
      loop
    />
  );
};
