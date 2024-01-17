import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";
import { MATCH_ACHIEVEMENTS } from "~/server/service/achievements.js";
import { type AchievementId } from "~/types/index.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";
import { text } from "~/assets/text/index.js";

interface Props {
  gainedScore: number;
  achievements: AchievementId[];
}

export const Score: FC<Props> = ({ gainedScore, achievements }) => {
  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.heading}>
        <Typography variant="h6">{text.achievements.scoreBreakdown}</Typography>
      </Stack>
      <Stack sx={styles.achievements}>
        {achievements.length === 0 && (
          <Typography
            variant="body2"
            sx={{ margin: "auto", textTransform: "uppercase" }}
          >
            {text.achievements.betterLuckNextTime}
          </Typography>
        )}
        {achievements.map((achievementResult) => {
          const { name } = MATCH_ACHIEVEMENTS[achievementResult] ?? {
            name: "Achievement",
          };

          return (
            <Stack
              key={achievementResult}
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "7px",
                marginTop: "7px",
              }}
            >
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body1">
                {text.achievements.points(
                  POINTS_ACHIEVEMENTS[achievementResult],
                )}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Stack sx={styles.score}>
        <Typography variant="body1">{text.achievements.totalScore}</Typography>
        <Typography variant="body1">
          {text.achievements.points(gainedScore)}
        </Typography>
      </Stack>
    </Stack>
  );
};
