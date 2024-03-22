import React, { type FC } from "react";
import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { theme } from "~/styles/theme.js";

const sectionContent = text.howToPlay.pointsAndPenalties;
/**
 * How-to-play page section with static content
 * explaining the point system
 */
export const PointsAndPenalties: FC = () => {
  return (
    <ul>
      <li>
        <Typography variant="body1">
          {sectionContent[0].regular}
          <span style={{ color: theme.palette.primary.main }}>
            {sectionContent[0].highlight}
          </span>
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          {sectionContent[1].regular}
          <span style={{ color: theme.palette.primary.main }}>
            {sectionContent[1].highlight}
          </span>
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          {sectionContent[2].regular}
          <span style={{ color: theme.palette.secondary.main }}>
            {sectionContent[2].highlight}
          </span>
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          {sectionContent[3].regular}
          <span style={{ color: theme.palette.secondary.main }}>
            {sectionContent[3].highlight}
          </span>
        </Typography>
      </li>
    </ul>
  );
};
