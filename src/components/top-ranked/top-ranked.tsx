import { type FC } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { type TopRankedPlayer } from "~/types/index.js";

import { styles } from "./styles.js";
import { theme } from "~/styles/theme.js";

interface Props {
  players: TopRankedPlayer[];
}

export const TopRanked: FC<Props> = ({ players }) => {
  const animationStyles = [styles.topRankedBanner1, styles.topRankedBanner2];

  return (
    <Stack sx={styles.container}>
      <Typography
        variant="subtitle1"
        sx={styles.title}
        >
        {text.homepage.topRankedTitle}
      </Typography>
      {animationStyles.map((sx, index) => (
        <Stack sx={{ ...styles.textContainer, ...sx }} key={index}>
          {players.map(({ username, score }, index) => (
            <Typography
              variant="subtitle2"
              sx={styles.text}
              color={theme.palette.common.black}
              key={index}
            >
              {text.homepage.topRanked(index, username, score)}
              <Box component={"span"} sx={styles.points}>
                {text.homepage.points}
              </Box>
            </Typography>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
