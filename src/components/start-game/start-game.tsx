import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "@/assets/text";
import { pages } from "@/utils/router";
import { api } from "@/utils/api";
import { styles } from "./styles";
import { TopRanked } from "../top-ranked";
import { TOP_RANKED_PLAYERS } from "@/constants";

export const StartGame: FC = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const startGameHandler = () => void push(pages.lobby);
  const openDailyHandler = () => void push(pages.leaderboard);
  const isDisabled = join.status === "loading";

  return (
    <Stack sx={styles.textContainer}>
      <Typography variant="h1">{text.homepage.appName}</Typography>
      <Stack sx={styles.description}>
        <Typography variant="h5">{text.homepage.descriptionPart1}</Typography>
        <Typography variant="h5">{text.homepage.descriptionPart2}</Typography>
      </Stack>
      <Stack sx={styles.actions}>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={startGameHandler}
          sx={styles.startGameButton}
        >
          <Typography variant="h3" sx={styles.buttonText}>
            {text.homepage.startNewGame}
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="blueGrey"
          disabled={isDisabled}
          onClick={openDailyHandler}
          sx={styles.openDailyButton}
        >
          {text.homepage.openDaily}
        </Button>
      </Stack>
      <TopRanked players={TOP_RANKED_PLAYERS} />
    </Stack>
  );
};