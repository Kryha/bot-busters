import { type FC, type ReactNode } from "react";
import { type CharacterName } from "~/types/index.js";
import { Slide, Stack } from "@mui/material";
import { AnimationPlayer } from "~/components/animation/index.js";
import { getTransitionLines } from "~/utils/characters.jsx";
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
        <Stack sx={styles.transitionLines(backgroundColor)}>
          <AnimationPlayer
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            animationData={transitionLines}
            play
            loop
          />
          {children}
        </Stack>
      </Stack>
    </Slide>
  );
};
