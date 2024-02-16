import { AnimationPlayer } from "~/components/animation/index.js";
import { BOTBUSTERS_LOGO_ANIMATION_SEGMENT } from "~/constants/index.js";
import { BotBustersLogo } from "~/assets/animations/index.js";
import { Box } from "@mui/material";
import { styles } from "./styles.js";

export const BotBusterLogoAnimation = () => {
  return (
    <Box component={"div"} sx={styles.container}>
      <AnimationPlayer
        animationData={BotBustersLogo}
        segments={BOTBUSTERS_LOGO_ANIMATION_SEGMENT}
        play
        loop
        style={{ width: 800, height: 220 }}
      />
    </Box>
  );
};
