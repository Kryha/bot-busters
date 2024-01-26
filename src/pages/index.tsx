import { Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router.js";

import { text } from "~/assets/text/index.js";
import { TopRanked } from "~/components/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { TOP_RANKED_PLAYERS } from "~/constants/index.js";
import { PixelButton } from "~/components/pixel-button/index.js";
import { BotBusterLogoAnimation } from "~/containers/lottie-animations/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";

import { styles } from "~/styles/pages/homepage.js";

const Homepage = () => {
  const { push } = useRouter();

  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const handleGameStart = async () => {
    if (loggedUser.isLoading) return;
    try {
      if (loggedUser.isError) {
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
          disabled={loggedUser.isLoading}
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
