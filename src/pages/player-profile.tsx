import { Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router.js";
import { usePlaySFX } from "~/hooks/sounds.js";

import { pages } from "~/router.js";
import { api } from "~/utils/api.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { PlayerTable } from "~/components/index.js";
import { isVerifiedUser } from "~/utils/user.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { LoadingPage } from "~/components/loading-page/index.js";
import { AchievementsTable } from "~/components/tables/index.js";
import { text } from "~/assets/text/index.js";
import { styles } from "~/styles/pages/player-profile.js";

const PlayerProfile = () => {
  const router = useRouter();
  const playSfx = usePlaySFX();
  const handleClick = (path: string) => {
    playSfx("BlipUp");
    void router.push(path);
  };

  const user = api.user.getLoggedUserProfile.useQuery(undefined, {
    retry: false,
  });

  if (user.isLoading) {
    return <LoadingPage />;
  }

  return (
    <PageLayout title={user.data?.username ?? text.playerProfile.profile}>
      {user.data && (
        <>
          <Typography variant="h2" sx={styles.title}>
            {text.playerProfile.leaderboardTitle}
          </Typography>
          <Stack sx={styles.table}>
            <PlayerTable playerProfile={user.data} />
          </Stack>
        </>
      )}

      {user.data && (
        <>
          <Typography variant="h2" sx={styles.title}>
            {text.playerProfile.achievementsTitle}
          </Typography>
          <Stack sx={styles.table}>
            <AchievementsTable playerProfile={user.data} />
          </Stack>
        </>
      )}

      {!isVerifiedUser(user.data) && (
        <Stack sx={styles.connectWallet}>
          <Stack alignItems="center" gap={2}>
            <Typography variant="body1">
              {text.playerProfile.createProfile}
            </Typography>
          </Stack>

          <PrimaryButton
            variant="contained"
            color="blueGrey"
            onClick={() => handleClick(pages.login)}
          >
            {text.playerProfile.connectWallet}
          </PrimaryButton>
        </Stack>
      )}
    </PageLayout>
  );
};

export default PlayerProfile;
