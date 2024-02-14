import { Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router.js";

import { text } from "~/assets/text/index.js";
import { BotBusterLogoAnimation } from "~/components/bot-buster-logo/index.js";
import { TopRanked } from "~/components/index.js";
import { PixelButton } from "~/components/pixel-button/index.js";
import { PlayButton } from "~/components/play-button/index.js";
import { EMPTY_RES } from "~/constants/index.js";
import { usePlaySFX } from "~/hooks/sounds.js";
import { pages } from "~/router.js";
import { styles } from "~/styles/pages/homepage.js";
import { api } from "~/utils/api.js";

const Homepage = () => {
  const { push } = useRouter();
  const playSfx = usePlaySFX();

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

  const openHandler = (path: string) => {
    void playSfx("./sounds/BB_UI_Blip_Up.mp3");
    void push(path);
  };

  return (
    <Stack sx={styles.textContainer}>
      <Stack sx={styles.description}>
        <Typography variant="body1">
          {text.homepage.descriptionPart1}
        </Typography>
        <BotBusterLogoAnimation />
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
        <PixelButton
          onClick={() => openHandler(pages.leaderboard)}
          text={text.homepage.openDaily}
        />
        <PixelButton
          onClick={() => openHandler(pages.about)}
          text={text.homepage.about}
        />
      </Stack>
      <TopRanked />
    </Stack>
  );
};

export default Homepage;
