import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import { LANDING_PAGE_ANIMATION_SEGMENT } from "~/constants/index.js";
import { LandingPage } from "~/assets/animations/index.js";
import homepage from "~/assets/images/homepage.png";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

const AnimationPlayer = dynamic(
  () => import("react-lottie-player/dist/LottiePlayerLight"),
  {
    loading: () => <StaticHomePage />,
    ssr: false,
  },
);

export const HomePageAnimation = () => {
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

const StaticHomePage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 0,
        inset: 0,
        "& > img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      }}
    >
      <Image src={homepage} alt={"homepage"} />
    </Box>
  );
};
