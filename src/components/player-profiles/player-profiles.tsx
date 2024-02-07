import React, { type FC } from "react";
import { Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { BulletPoint } from "~/components/index.js";
import { theme } from "~/styles/theme.js";
import { useRouter } from "next/router";
import { pages } from "~/router";

const sectionContent = text.howToPlay.playerProfiles;

/**
 * How-to-play page section with static content
 * with information about accounts
 */
export const PlayerProfiles: FC = () => {
  const router = useRouter();

  return [
    <BulletPoint key="playerProfile1">
      <Typography variant="body1">
        {sectionContent[0].regular}
        <span style={{ color: theme.palette.primary.main }}>
          {sectionContent[0].highlight}
        </span>
      </Typography>
    </BulletPoint>,
    <BulletPoint key="playerProfile2">
      <Typography variant="body1">
        {sectionContent[1].regular}
        <a
          onClick={() => void router.push(pages.login)}
          style={{ color: theme.palette.primary.main }}
        >
          {sectionContent[1].highlight}
        </a>
      </Typography>
    </BulletPoint>
  ];
};
