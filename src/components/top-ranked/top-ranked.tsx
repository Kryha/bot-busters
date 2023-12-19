import { type FC } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { type TopRankedPlayer } from "~/types/index.js";

import { styles } from "./styles.js";
import { theme } from "~/styles/theme";

interface Props {
  players: TopRankedPlayer[];
}

export const TopRanked: FC<Props> = ({ players }) => {
  const animationStyles = [styles.animation1, styles.animation2];

  return (
    <Stack sx={styles.container}>
      {animationStyles.map((sx, index) => (
        <Stack sx={{ ...styles.textContainer, ...sx }} key={index}>
          <Typography
            variant="subtitle1"
            sx={styles.title}
            color={theme.palette.common.black}
          >
            {text.homepage.topRankedTitle}
          </Typography>
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
