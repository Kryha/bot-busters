import { type FC, type ReactNode } from "react";
import { type CharacterName } from "~/types/index.js";
import { Slide, Stack } from "@mui/material";
import { getTransitionLines } from "~/utils/characters.jsx";
import { AnimationPlayer } from "~/components/index.js";
import { zIndex } from "~/styles/z-index.js";
import { theme } from "~/styles/theme.js";
import { styles } from "./styles.js";

interface Props {
  children: ReactNode;
  showSplashScreen: boolean;
  characterName?: CharacterName;
  backgroundColor?: string;
}

export const SplashScreen: FC<Props> = ({
  children,
  characterName,
  showSplashScreen,
  backgroundColor = theme.palette.purple.dark,
}) => {
  const transitionLines = getTransitionLines(characterName);

  return (
    <Slide direction="left" in={showSplashScreen} mountOnEnter unmountOnExit>
      <Stack sx={styles.container(backgroundColor)}>
        <AnimationPlayer
          rendererSettings={{ preserveAspectRatio: "xMidYMax slice" }}
          animationData={transitionLines}
          play
          style={{ width: "100vw", height: "100%", zIndex: zIndex.back }}
          loop
        />
        {children}
      </Stack>
    </Slide>
  );
};
