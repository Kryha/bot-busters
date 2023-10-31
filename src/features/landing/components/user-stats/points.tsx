import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";

interface Props {
  isGamePlayed: boolean;
  points: number;
  position: number;
}

export const Points: FC<Props> = ({ isGamePlayed, points, position }) => {
  if (!isGamePlayed) return;

  return (
    <Stack sx={styles.pointsWrapper}>
      <Stack sx={styles.pointsContainer}>
        <Typography variant="overline" color="blueGrey.main">
          {text.landing.yourScoreToday}
        </Typography>
        <Typography variant="h5" color="blueGrey.main">
          {text.landing.points(points)}
        </Typography>
      </Stack>
      <Stack sx={styles.pointsContainer}>
        <Typography variant="overline" color="blueGrey.main">
          {text.landing.yourPosition}
        </Typography>
        <Typography variant="h5" color="blueGrey.main">
          {text.landing.numberPosition(position)}
        </Typography>
      </Stack>
    </Stack>
  );
};
