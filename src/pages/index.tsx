import { useRouter } from "next/router.js";
import { Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { Navbar, TopRanked } from "~/components/index.js";
import { PlayButton } from "~/components/play-button/index.js";
import { PixelButton } from "~/components/pixel-button/index.js";
import { BotBusterLogoAnimation } from "~/components/bot-buster-logo/index.js";
import { LandingPageAnimation } from "~/components/landing-page-animation/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { EMPTY_RES } from "~/constants/index.js";
import { text } from "~/assets/text/index.js";
import { styles } from "~/styles/pages/homepage.js";

const Homepage = () => {
  const { push } = useRouter();

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToMatch = async () => {
    if (match.isLoading || !match.data || match.data === EMPTY_RES) return;

    await push({
      pathname: pages.match,
      query: { roomId: match.data.id },
    });
  };

  const openDailyHandler = () => void push(pages.leaderboard);
  const openAboutHandler = () => void push(pages.about);

  return (
    <Stack sx={styles.wrapper}>
      <Navbar />
      <LandingPageAnimation />
      <Stack sx={styles.container}>
        <Stack sx={styles.logo}>
          <Typography variant="body1">
            {text.homepage.descriptionPart1}
          </Typography>
          <BotBusterLogoAnimation />
          <Typography variant="body1" sx={styles.aleoSystems}>
            {text.homepage.aleoSystems()}
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
              onClick={openDailyHandler}
              text={text.homepage.leaderboard}
            />
            <PixelButton
              onClick={openAboutHandler}
              text={text.homepage.about}
              sx={styles.aboutButton}
            />
          </Stack>
        </Stack>
      </Stack>
      <TopRanked />
    </Stack>
  );
};

export default Homepage;
