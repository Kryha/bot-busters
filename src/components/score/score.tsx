import { Stack, Tooltip, Typography } from "@mui/material";
import { type FC, useEffect } from "react";

import { text } from "~/assets/text/index.js";
import { POINTS_ACHIEVEMENTS } from "~/constants/main.js";
import { type PlayerType } from "~/types/index.js";
// TODO: decouple from server
import { matchAchievements } from "~/server/service/achievements.js";
import { usePlaySFX } from "~/hooks/sounds.js";
import {
  LOSE_SFX,
  RESULTS_SFX_TIME_MS,
  type TrackId,
  WIN_SFX,
} from "~/constants/sounds.js";
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
  const playSfx = usePlaySFX();
  const loseInt = Math.floor(Math.random() * LOSE_SFX) + 1;
  const winInt = Math.floor(Math.random() * WIN_SFX) + 1;

  useEffect(() => {
    setTimeout(() => {
      if (player.score === 0) {
        playSfx("Lose6");
      }

      if (player.botsBusted > 0) {
        playSfx(`Win${winInt}` as TrackId);
      }

      if (player.humansBusted > 0) {
        playSfx(`Lose${loseInt}` as TrackId);
      }

      if (player.humansFooled > 0) {
        playSfx(`Lose${winInt}` as TrackId);
      }
    }, RESULTS_SFX_TIME_MS);
  }, [
    loseInt,
    playSfx,
    player.botsBusted,
    player.humansBusted,
    player.humansFooled,
    player.score,
    winInt,
  ]);

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
        {player.humansFooled > 0 && (
          <ScoreRow
            title={text.achievements.humansFooled(player.humansFooled)}
            score={player.humansFooledScore}
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
