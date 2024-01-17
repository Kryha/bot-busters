import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { styles } from "./styles.js";

import { MATCH_ACHIEVEMENTS } from "~/server/service/achievements.js";
import { type AchievementId } from "~/types/index.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";
import { text } from "~/assets/text/index.js";

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
        <Stack
          sx={{
            flexDirection: "colum",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {achievements.length === 0 && (
            <Typography
              variant="body1"
              sx={{ marginBottom: "7px", marginTop: "7px" }}
            >
              better luck next time
            </Typography>
          )}
          {achievements.map((achievementResult) => {
            const { name } = MATCH_ACHIEVEMENTS[achievementResult] ?? {
              name: "Achievement",
            };

            return (
              <>
                <Stack
                  key={achievementResult}
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "7px",
                    marginTop: "7px",
                  }}
                >
                  <Typography variant="body1" sx={{ marginBottom: "2px" }}>
                    {name}
                  </Typography>
                  <Typography variant="body1">
                    {text.achievements.points(
                      POINTS_ACHIEVEMENTS[achievementResult],
                    )}
                  </Typography>
                </Stack>
              </>
            );
          })}
          <Divider />
        </Stack>
      </Stack>
      <Stack sx={styles.score}>
        <Typography variant="body1">
          {text.achievements.yourScore(correctGuesses)}
        </Typography>
        <Typography variant="body1">
          {text.achievements.points(gainedScore)}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
