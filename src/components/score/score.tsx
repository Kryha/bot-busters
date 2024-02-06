import { type FC } from "react";
import { Stack, Tooltip, Typography } from "@mui/material";

import { type PlayerType } from "~/types/index.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";
import { text } from "~/assets/text/index.js";
// TODO: decouple from server
import { matchAchievements } from "~/server/service/achievements.js";

import { styles } from "./styles.js";

interface ScoreRowProps {
  title: string;
  score: number;
  description?: string;
}

const ScoreRow: FC<ScoreRowProps> = ({ description, score, title }) => {
  const row = () => (
    <Stack sx={styles.achievement}>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="body1">{text.achievements.points(score)}</Typography>
    </Stack>
  );

  if (description)
    return (
      <Tooltip
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
        {row()}
      </Tooltip>
    );

  return row();
};

const BetterLuckNextTime = () => (
  <Typography
    variant="body2"
    sx={{ margin: "auto", textTransform: "uppercase", p: 4 }}
  >
    {text.achievements.betterLuckNextTime}
  </Typography>
);

interface ScoreProps {
  player: PlayerType;
}

export const Score: FC<ScoreProps> = ({ player }) => {
  const tableContent = () => {
    if (player.score === 0) return <BetterLuckNextTime />;

    return (
      <>
        {player.botsBusted > 0 && (
          <ScoreRow
            title={text.achievements.botsBusted(player.botsBusted)}
            score={player.botsBustedScore}
          />
        )}

        {player.humansBusted > 0 && (
          <ScoreRow
            title={text.achievements.humansIdentified(player.humansBusted)}
            score={player.humansBustedScore}
          />
        )}

        {player.achievements.map((achievement) => {
          const { name, description } = matchAchievements[achievement];

          return (
            <ScoreRow
              key={achievement}
              title={name}
              score={POINTS_ACHIEVEMENTS[achievement]}
              description={description}
            />
          );
        })}
      </>
    );
  };

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.heading}>
        <Typography variant="h6">{text.achievements.scoreBreakdown}</Typography>
      </Stack>

      <Stack sx={styles.achievements}>{tableContent()}</Stack>

      <Stack sx={styles.score}>
        <Typography variant="body1">{text.achievements.totalScore}</Typography>
        <Typography variant="body1">
          {text.achievements.points(player.score)}
        </Typography>
      </Stack>
    </Stack>
  );
};
