import { type FC } from "react";
import { Stack } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";
import { PointsDisplay } from "../points-display";

interface Props {
  isGamePlayed: boolean;
  points: number;
  position: number;
}

export const Points: FC<Props> = ({ isGamePlayed, points, position }) => {
  if (!isGamePlayed) return;

  return (
    <Stack sx={styles.pointsWrapper}>
      <PointsDisplay
        title={text.landing.yourScoreToday}
        info={text.landing.points(points)}
        isCentered
      />
      <PointsDisplay
        title={text.landing.yourPosition}
        info={text.landing.numberPosition(position)}
        isCentered
      />
    </Stack>
  );
};
