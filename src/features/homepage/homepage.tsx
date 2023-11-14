import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { text } from "@/assets/text";
import { TopRanked } from "@/components";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { TOP_RANKED_PLAYERS } from "@/constants";
import { isValidSession } from "@/utils/session";
import { signIn, useSession } from "next-auth/react";

export const Homepage = () => {
  const { push } = useRouter();
  const join = api.lobby.join.useMutation();
  const { data: sessionData } = useSession();

  const startGameHandler = async () => {
    if (!isValidSession(sessionData)) {
      await signIn("credentials", {});
    }
    void push(pages.lobby);
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
          onClick={() => void startGameHandler()}
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
