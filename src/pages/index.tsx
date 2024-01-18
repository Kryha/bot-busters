import { Stack, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router.js";

import { text } from "~/assets/text/index.js";
import { TopRanked } from "~/components/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { TOP_RANKED_PLAYERS } from "~/constants/index.js";
import { isValidSession } from "~/utils/session.js";
import { PixelButton } from "~/components/pixel-button/index.js";
import { BotBusterLogoAnimation } from "~/containers/lottie-animations/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";

import { styles } from "~/styles/pages/homepage.js";

const Homepage = () => {
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
  const openAboutHandler = () => void push(pages.about);
  const isDisabled = join.status === "loading";

  return (
    <Stack sx={styles.textContainer}>
      <Stack sx={styles.description}>
        <Typography variant="body1">
          {text.homepage.descriptionPart1}
        </Typography>
        <BotBusterLogoAnimation />
      </Stack>
      <Stack sx={styles.actions}>
        <PrimaryButton
          aria-label="Start"
          disabled={isDisabled}
          onClick={() => void handleGameStart()}
          sx={styles.startGameButton}
        >
          <Typography variant="h3" sx={styles.buttonText}>
            {text.homepage.startNewGame}
          </Typography>
        </PrimaryButton>
        <PixelButton
          onClick={openDailyHandler}
          text={text.homepage.openDaily}
        />
        <PixelButton onClick={openAboutHandler} text={text.homepage.about} />
      </Stack>
      <TopRanked players={TOP_RANKED_PLAYERS} />
    </Stack>
  );
};

export default Homepage;
