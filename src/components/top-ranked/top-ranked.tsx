import { type FC } from "react";
import { Box, Slide, Stack, Typography } from "@mui/material";

import { api } from "~/utils/api.js";
import { theme } from "~/styles/theme.js";
import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";

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
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Stack component="footer" sx={styles.container}>
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
      </Slide>
    );
  } else {
    // Use static list if less than 3 entries
    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
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
      </Slide>
    );
  }
};
