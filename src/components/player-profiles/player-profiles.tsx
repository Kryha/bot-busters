import React, { type FC } from "react";
import { Typography } from "@mui/material";

import { text } from "~/assets/text";
import { BulletPoint } from "~/components";
import { theme } from "~/styles/theme";

const sectionContent = text.howToPlay.playerProfiles;

export const PlayerProfiles: FC = () => [
  <BulletPoint key="playerProfile1">
    <Typography variant="body1">{sectionContent[0].regular}
      <span style={{ color: theme.palette.primary.main}}>{sectionContent[0].highlight}</span>
    </Typography>
  </BulletPoint>,
  <BulletPoint key="playerProfile2">
    <Typography variant="body1">
      {sectionContent[1].regular}
      <a href="" style={{ color: theme.palette.primary.main }}>{sectionContent[1].highlight}</a>
    </Typography>
  </BulletPoint>,
  <BulletPoint key="playerProfile3">
    <Typography variant="body1">{sectionContent[2].regular}
      <a href="" style={{ color: theme.palette.secondary.main }}>{sectionContent[2].highlight}</a>
    </Typography>
  </BulletPoint>,
];

