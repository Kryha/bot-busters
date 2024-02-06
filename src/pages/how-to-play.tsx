import { Stack, Typography } from "@mui/material";
import React, { type FC } from "react";

import { text as copywrite } from "~/assets/text/index.js";
import {
  BulletPoint,
  GameRules,
  PlayerProfiles,
  PointsAndPenalties,
} from "~/components/index.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { styles } from "~/styles/pages/how-to-play.js";

const HowToPlay: FC = () => {
  const pageContent = copywrite.howToPlay;

  return (
    <PageLayout title={pageContent.headings.howToPlay}>
      <Typography variant="body1" textAlign="center" sx={styles.text}>
        {pageContent.main[0]}
        <br />
        <br />
        {pageContent.main[1]}
      </Typography>

      <Stack sx={{ ...styles.section, ml: "-50px" }}>
        <GameRules />
      </Stack>

      <Typography variant="h1" sx={styles.heading}>
        {pageContent.headings.pointsAndPenalties}
      </Typography>
      <Stack sx={styles.section}>
        <PointsAndPenalties />
      </Stack>

      <Typography variant="h1" sx={styles.heading}>
        {pageContent.headings.dailyLeaderboard}
      </Typography>
      <Stack sx={styles.section}>
        {pageContent.dailyLeaderboard.map((content, idx) => (
          <BulletPoint key={"leaderboard" + idx} text={content} />
        ))}
      </Stack>

      <Typography variant="h1" sx={styles.heading}>
        {pageContent.headings.playerProfiles}
      </Typography>
      <Stack sx={styles.section}>
        <PlayerProfiles />
      </Stack>
    </PageLayout>
  );
};

export default HowToPlay;
