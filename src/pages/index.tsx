import { Box, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useErrorBoundary } from "react-error-boundary";

import { text } from "~/assets/text/index.js";
import { BotBusterLogoAnimation } from "~/components/bot-buster-logo/index.js";
import { Navbar, TopRanked } from "~/components/index.js";
import { LandingPageAnimation } from "~/components/landing-page-animation/index.js";
import { PixelButton } from "~/components/pixel-button/index.js";
import { PlayButton } from "~/components/play-button/index.js";
import { errorMessage } from "~/constants/error-messages.js";
import { EMPTY_RES } from "~/constants/index.js";
import { usePlayMusic, usePlaySFX } from "~/hooks/sounds.js";
import { useAndRequireContext } from "~/hooks/use-and-require-context.js";
import { ContextRef } from "~/containers/sound-provider/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { styles } from "~/styles/pages/homepage.js";

const Homepage = () => {
  const { push } = useRouter();
  const playSfx = usePlaySFX();

  const { mainContainerRef } = useAndRequireContext(
    ContextRef,
    "Homepage",
    "sound-provider",
  );

  usePlayMusic("HomePage", true, pages.home);

  const { showBoundary } = useErrorBoundary();
  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });
  const match = api.match.getOngoingMatch.useQuery();

  const handleGameStart = async () => {
    if (loggedUser.isLoading || match.isLoading) return;

    try {
      if (loggedUser.isError) {
        await signIn("credentials", { callbackUrl: pages.lobby });
      } else {
        await push(pages.lobby);
      }
    } catch (e) {
      e instanceof Error
        ? console.error(`[${errorMessage.match.general}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.match.general);
    }
  };

  const handleGoToMatch = async () => {
    if (match.isLoading || !match.data || match.data === EMPTY_RES) return;

    await push({
      pathname: pages.match,
      query: { roomId: match.data.id },
    });
  };

  const openHandler = (path: string) => {
    playSfx("BlipUp");
    void push(path);
  };

  return (
    <Box component="main" ref={mainContainerRef} sx={styles.wrapper}>
      <Navbar />
      <LandingPageAnimation />
      <Stack component="div" sx={styles.logo}>
        <Typography variant="body1" sx={styles.whoIsABot}>
          {text.homepage.descriptionPart1}
        </Typography>
        <BotBusterLogoAnimation />
        <Typography variant="body1" sx={styles.aleoSystems}>
          {text.homepage.aleoSystems}
        </Typography>
      </Stack>
      <Stack sx={styles.actions}>
        {match.data && match.data !== EMPTY_RES ? (
          <PixelButton
            disabled={loggedUser.isLoading || match.isLoading}
            onClick={() => void handleGoToMatch()}
            text={text.homepage.continueGame}
          />
        ) : (
          <PlayButton
            disabled={loggedUser.isLoading || match.isLoading}
            onClick={() => void handleGameStart()}
          />
        )}
        <Stack sx={styles.menuActions}>
          <PixelButton
            onClick={() => openHandler(pages.leaderboard)}
            text={text.homepage.leaderboard}
          />
          <PixelButton
            onClick={() => openHandler(pages.about)}
            text={text.homepage.about}
          />
        </Stack>
      </Stack>
      <TopRanked />
    </Box>
  );
};

export default Homepage;
