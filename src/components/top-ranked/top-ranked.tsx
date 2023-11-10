import { Stack, Typography } from "@mui/material";
import { styles } from "./styles";
import { FC } from "react";
import { text } from "@/assets/text";
import { TopRankedPlayer } from "@/types";

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
