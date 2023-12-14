import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { text } from "./text.js";
import { MATCH_ACHIEVEMENTS } from "~/server/service/achievements.js";
import { type PlayerAchievementResult } from "~/types/match.js";

interface Props {
  correctGuesses: number;
  gainedScore: number;
  achievements: PlayerAchievementResult[];
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
        {achievements.map((achievementResult) => {
          const { name } = MATCH_ACHIEVEMENTS[achievementResult.id] ?? {
            name: "Achievement",
          };

          return (
            <>
              <Typography key={achievementResult.id} variant="body1">
                {name}
              </Typography>
              <Typography variant="body1">
                {text.points(achievementResult.points)}
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
