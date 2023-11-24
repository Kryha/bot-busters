import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { type TopRankedPlayer } from "~/types/index.js";

import { styles } from "./styles.js";

interface Props {
  players: TopRankedPlayer[];
}

export const TopRanked: FC<Props> = ({ players }) => {
  const animationStyles = [styles.animation1, styles.animation2];

  return (
    <Stack sx={styles.container}>
      {animationStyles.map((sx, index) => (
        <Stack sx={{ ...styles.textContainer, ...sx }} key={index}>
          {players.map(({ username, score }, index) => (
            <Typography variant="h5" sx={styles.text} key={index}>
              {text.homepage.topRanked(index, username, score)}
            </Typography>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
