import React, { type FC } from "react";
import { Typography } from "@mui/material";

import { text } from "~/assets/text";
import { BulletPoint } from "~/components";
import { theme } from "~/styles/theme";

const sectionContent = text.howToPlay.pointsAndPenalties;
/**
 * How-to-play page section with static content
 * explaining the point system
 */
export const PointsAndPenalties: FC = () => [
  <BulletPoint key="points1">
    <Typography variant="body1">
      {sectionContent[0].regular}
      <span style={{ color: theme.palette.primary.main }}>
        {sectionContent[0].highlight}
      </span>
    </Typography>
  </BulletPoint>,
  <BulletPoint key="points2">
    <Typography variant="body1">
      {sectionContent[1].regular}
      <span style={{ color: theme.palette.primary.main }}>
        {sectionContent[1].highlight}
      </span>
    </Typography>
  </BulletPoint>,
  <BulletPoint key="points3">
    <Typography variant="body1">
      {sectionContent[2].regular}
      <span style={{ color: theme.palette.secondary.main }}>
        {sectionContent[2].highlight}
      </span>
    </Typography>
  </BulletPoint>,
  <BulletPoint key="points4">
    <Typography variant="body1">
      {sectionContent[3].regular}
      <span style={{ color: theme.palette.secondary.main }}>
        {sectionContent[3].highlight}
      </span>
    </Typography>
  </BulletPoint>,
];
