import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { text } from "./text.js";
import { MATCH_ACHIEVEMENTS } from "~/server/service/achievements.js";

interface Props {
  correctGuesses: number;
  gainedScore: number;
  achievements: string[];
}

export const Score: FC<Props> = ({
  correctGuesses,
  gainedScore,
  achievements,
}) => {
  return (
    <Stack sx={styles.container}>
      <Divider />
      <Stack sx={styles.score}>
        <Typography variant="body1">Achievements:</Typography>
        {achievements.map((achievmentID) => {
          const achievement = MATCH_ACHIEVEMENTS[achievmentID];

          if (!achievement) return;
          return (
            <>
              <Typography key={achievmentID} variant="body1">
                {achievement?.name}
              </Typography>
              <Typography variant="body1">
                {text.points(achievement.points)}
              </Typography>
            </>
          );
        })}
      </Stack>
      <Stack sx={styles.score}>
        <Typography variant="body1">
          {text.yourScore(correctGuesses)}
        </Typography>
        <Typography variant="body1">{text.points(gainedScore)}</Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
