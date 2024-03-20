import dynamic from "next/dynamic";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { type BMEnterFrameEvent } from "lottie-web";
import { BotBustersLogo } from "~/assets/animations/index.js";
import { BOTBUSTERS_LOGO_ANIMATION_SEGMENT } from "~/constants/main.js";

import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";

const AnimationPlayer = dynamic(
  () => import("react-lottie-player/dist/LottiePlayerLight"),
  {
    ssr: false,
  },
);

export const BotBusterLogoAnimation = () => {
  const [showText, setShowText] = useState(false);
  return (
    <Stack component="div" sx={styles.logo}>
      <Typography variant="body1" sx={styles.whoIsABot(showText)}>
        {text.homepage.descriptionPart1}
      </Typography>
      <AnimationPlayer
        animationData={BotBustersLogo}
        segments={BOTBUSTERS_LOGO_ANIMATION_SEGMENT}
        rendererSettings={{ preserveAspectRatio: "xMidYMin slice" }}
        style={styles.container}
        onEnterFrame={(frame: BMEnterFrameEvent) => {
          frame.currentTime > 0 && setShowText(true);
        }}
        play
        loop
      />
      <Typography variant="body1" sx={styles.aleoSystems(showText)}>
        {text.homepage.aleoSystems}
      </Typography>
    </Stack>
  );
};
