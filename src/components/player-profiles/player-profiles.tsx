import React, { type FC } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "~/assets/text/index.js";
import { theme } from "~/styles/theme.js";
import { pages } from "~/router.js";

const sectionContent = text.howToPlay.playerProfiles;

/**
 * How-to-play page section with static content
 * with information about accounts
 */
export const PlayerProfiles: FC = () => {
  const router = useRouter();

  return [
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
          <a
            onClick={() => void router.push(pages.login)}
            style={{ color: theme.palette.primary.main }}
          >
            {sectionContent[1].highlight}
          </a>
        </Typography>
      </li>
    </ul>,
  ];
};
