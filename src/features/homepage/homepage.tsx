import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { text } from "~/assets/text/index.js";
import { TopRanked } from "~/components/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/utils/router.js";
import { TOP_RANKED_PLAYERS } from "~/constants/index.js";
import { isValidSession } from "~/utils/session.js";

import { styles } from "./styles.js";

export const Homepage = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const { data: sessionData } = useSession();

  const handleGameStart = async () => {
    try {
      if (!isValidSession(sessionData)) {
        await signIn("credentials", { callbackUrl: pages.lobby });
      } else {
        await push(pages.lobby);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          onClick={() => void handleGameStart()}
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
