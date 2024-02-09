import { type FC } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";
import { theme } from "~/styles/theme.js";
import { api } from "~/utils/api.js";

export const TopRanked: FC = () => {
  const animationStyles = [styles.topRankedBanner1, styles.topRankedBanner2];

  const getRankedUsers = api.user.getRankedUsers.useQuery({
    limit: 20,
  });

  const rankList = getRankedUsers.data?.players;

  // Hide banner if no data available
  if (!rankList) return <></>;

  // Use sliding animation if more than 2 entries
  if (rankList.length > 2) {
    return (
      <Stack sx={styles.container}>
        <Typography variant="subtitle1" sx={styles.title}>
          {text.homepage.topRankedTitle}
        </Typography>
        {animationStyles.map((sx, index) => (
          <Stack sx={{ ...styles.textContainer, ...sx }} key={index}>
            {rankList.map(({ rank, username, score }, index) => (
              <Typography
                variant="subtitle2"
                sx={styles.text}
                color={theme.palette.common.black}
                key={index}
              >
                {text.homepage.topRanked(rank, username!, score)}
                <Box component={"span"} sx={styles.points}>
                  {text.homepage.points}
                </Box>
              </Typography>
            ))}
          </Stack>
        ))}
      </Stack>
    );
  } else {
    // Use static list if less than 3 entries
    return (
      <Stack sx={styles.container}>
        <Typography variant="subtitle1" sx={styles.title}>
          {text.homepage.topRankedTitle}
        </Typography>
        <Stack
          sx={{ ...styles.textContainer, ...styles.textContainer }}
          width="100vw"
        >
          {rankList.map(({ rank, username, score }, index) => (
            <Typography
              variant="subtitle2"
              sx={styles.text}
              color={theme.palette.common.black}
              key={index}
            >
              {text.homepage.topRanked(rank, username!, score)}
              <Box component={"span"} sx={styles.points}>
                {text.homepage.points}
              </Box>
            </Typography>
          ))}
        </Stack>
      </Stack>
    );
  }
};
