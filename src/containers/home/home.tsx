import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router.js";

import { useRecaptcha } from "~/service/index.js";
import { TopRanked } from "~/components/index.js";
import { isValidSession } from "~/utils/session.js";
import Script from "next/script";
import { api } from "~/utils/api.js";
import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import { TOP_RANKED_PLAYERS } from "~/constants/index.js";
import { styles } from "./styles.js";

export const Homepage = () => {
  const { push } = useRouter();
  const [isRecaptchaFailed, setIsRecaptchaFailed] = useState<boolean>(false);
  const verifyCaptcha = api.recaptcha.verify.useMutation();
  const join = api.lobby.join.useMutation();
  const { data: sessionData } = useSession();
  const { recaptchaProps, executeRecaptcha, ...props } = useRecaptcha();

  const handleGameStart = async () => {
    const captchaToken = await executeRecaptcha("start_game");

    try {
      if (!isValidSession(sessionData)) {
        await signIn("credentials", {
          callbackUrl: pages.lobby,
        });
      } else {
        const result = await verifyCaptcha.mutateAsync({ captchaToken });
        if (!result) {
          void push(pages.lobby);
        } else {
          setIsRecaptchaFailed(true);
          return;
        }
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
        {isRecaptchaFailed && (
          <Typography variant="h6" color={"error"}>
            {text.homepage.botDetected}
          </Typography>
        )}
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
      <Script
        id={recaptchaProps.id}
        src={recaptchaProps.src}
        strategy={recaptchaProps.strategy}
        onLoad={recaptchaProps.onLoad}
        onError={recaptchaProps.onError}
        {...props}
      />
    </Stack>
  );
};
