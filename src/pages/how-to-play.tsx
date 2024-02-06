import { Stack, Typography } from "@mui/material";
import React, { type FC } from "react";

import { text as copywrite } from "~/assets/text/index.js";
import {
  BulletPoint,
  GameRules,
  PlayerProfiles,
  PointsAndPenalties,
} from "~/components/index.js";
import { PageHeader } from "~/containers/page-header/index.js";
import { styles } from "~/styles/pages/how-to-play.js";

const HowToPlay: FC = () => {
  const pageContent = copywrite.howToPlay;

  return (
    <Stack sx={styles.container}>
      <PageHeader text={pageContent.headings.howToPlay} />
      <Typography variant="body1" textAlign="center" sx={styles.text}>
        {pageContent.main[0]}
        <br />
        <br />
        {pageContent.main[1]}
      </Typography>
      <Stack sx={styles.gameRulesSection}>
        <GameRules />
      </Stack>

      <Typography variant="h1" sx={styles.heading}>
        {pageContent.headings.pointsAndPenalties}
      </Typography>
      <Stack sx={styles.pointsAndPenaltiesSection}>
        <PointsAndPenalties />
      </Stack>

      <Typography variant="h1" sx={styles.heading}>
        {pageContent.headings.dailyLeaderboard}
      </Typography>
      <Stack sx={styles.dailyLeaderboard}>
        {pageContent.dailyLeaderboard.map((content, idx) => (
          <BulletPoint key={"leaderboard" + idx} text={content} />
        ))}
      </Stack>

      <Typography variant="h1" sx={styles.heading}>
        {pageContent.headings.playerProfiles}
      </Typography>
      <Stack sx={styles.playerProfiles}>
        <PlayerProfiles />
      </Stack>
    </Stack>
  );
};

export default HowToPlay;
