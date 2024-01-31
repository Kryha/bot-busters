import { type FC } from "react";
import { Stack, Tooltip, Typography } from "@mui/material";

import { type AchievementId } from "~/types/index.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";
import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";
import { matchAchievements } from "~/server/service/achievements.js";

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
        {achievements.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ margin: "auto", textTransform: "uppercase" }}
          >
            {text.achievements.betterLuckNextTime}
          </Typography>
        ) : (
          achievements.map((achievementResult) => {
            const { name, description } = matchAchievements[
              achievementResult
            ] ?? {
              name: "Achievement",
            };

            return (
              <Tooltip
                key={achievementResult}
                title={description}
                placement="left-start"
                slotProps={{
                  popper: {
                    sx: styles.toolTipPopper,
                  },
                }}
                componentsProps={{
                  tooltip: {
                    sx: styles.toolTip,
                  },
                }}
              >
                <Stack sx={styles.achievement}>
                  <Typography variant="body1">{name}</Typography>
                  <Typography variant="body1">
                    {text.achievements.points(
                      POINTS_ACHIEVEMENTS[achievementResult],
                    )}
                  </Typography>
                </Stack>
              </Tooltip>
            );
          })
        )}
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
