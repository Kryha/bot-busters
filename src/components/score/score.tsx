import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { text } from "./text.js";
import { MATCH_ACHIEVEMENTS } from "~/server/service/achievements.js";
import { type AchievementId } from "~/types/index.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";

interface Props {
  correctGuesses: number;
  gainedScore: number;
  achievements: AchievementId[];
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
        <Stack sx={{ flexDirection: "colum" }}>
          <Stack sx={{ flexDirection: "row" }}>
            {achievements.map((achievementResult) => {
              const { name } = MATCH_ACHIEVEMENTS[achievementResult] ?? {
                name: "Achievement",
              };

              return (
                <>
                  <Typography key={achievementResult} variant="body1">
                    {name}
                  </Typography>
                  <Typography variant="body1">
                    {text.points(POINTS_ACHIEVEMENTS[achievementResult])}
                  </Typography>
                </>
              );
            })}
          </Stack>
        </Stack>
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
