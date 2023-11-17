import { Button, Stack, Typography } from "@mui/material";

import { styles } from "./styles";
import { pages } from "@/utils/router";
import { useRouter } from "next/router";
import { text } from "../../../chat/text";

export const Results = () => {
  const router = useRouter();
  // TODO: get real values
  const pointsWon = 30;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.textContainer}>
        <Typography variant="h2">{text.amountBotsBusted}</Typography>
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
            {text.addScore}
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            onClick={() => void router.push(pages.home)}
          >
            {text.playNewGame}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
