import { Stack } from "@mui/material";
import { AnimationPlayer } from "~/components/animation/index.js";
import { LANDING_PAGE_ANIMATION_SEGMENT } from "~/constants/index.js";
import { LandingPage } from "~/assets/animations/index.js";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

export const LandingPageAnimation = () => {
  return (
    <Stack sx={styles.container}>
      <AnimationPlayer
        animationData={LandingPage}
        segments={LANDING_PAGE_ANIMATION_SEGMENT}
        background={theme.palette.purple.dark}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        style={{ height: "97vh" }}
        play
        loop
      />
    </Stack>
  );
};
