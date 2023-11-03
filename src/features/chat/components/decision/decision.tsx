import { Button, Stack, Typography } from "@mui/material";

import { styles } from "./styles";
import { text } from "@/features/chat/text";
import { pages } from "@/utils/router";
import { useRouter } from "next/router";

export const Decision = () => {
  const router = useRouter();
  // TODO: get actual values
  const totalPlayers = 2;
  const botsBusted = 1;
  const pointsWon = 90;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.textContainer}>
        <Typography variant="h2">
          {text.amountBotsBusted(botsBusted, totalPlayers)}
        </Typography>
        <Typography variant="h1">{text.pointsWon(pointsWon)}</Typography>
      </Stack>

      <Stack sx={styles.textWrapper}>
        <Typography variant="body1">{text.addScoreToLeaderboard}</Typography>
        <Stack sx={styles.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            color="blueGrey"
            onClick={() => void router.push(pages.login)}
          >
            {text.addScoreNow}
          </Button>

          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            onClick={() => void router.push(pages.home)}
          >
            {text.continueWith}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
