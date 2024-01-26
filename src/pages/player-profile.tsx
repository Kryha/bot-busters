import { Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router.js";

import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import { styles } from "~/styles/pages/player-profile.js";
import { api } from "~/utils/api.js";
import { PrimaryButton } from "~/components/primary-button/index.js";

const PlayerProfile = () => {
  const router = useRouter();

  const user = api.user.getLoggedUser.useQuery(undefined, { retry: false });

  const isVerifiedUser = !!user.data?.address && !!user.data.username;

  return (
    <Stack sx={styles.mainContainer}>
      <Typography variant="h1" color="common.black">
        {text.playerProfile.profile}
      </Typography>

      {/* <Stack sx={styles.table}>
        <PlayerTable playerProfile={fakePlayerProfile} />
      </Stack> */}

      {!isVerifiedUser && (
        <Stack alignItems="center" gap={4}>
          <Stack alignItems="center" gap={2}>
            <Typography variant="body1">
              {text.playerProfile.createProfile}
            </Typography>
            <Typography variant="body1">
              {text.playerProfile.top10ReceiveCredits}
            </Typography>
          </Stack>

          <PrimaryButton
            variant="contained"
            color="blueGrey"
            onClick={() => void router.push(pages.login)}
          >
            {text.playerProfile.connectWallet}
          </PrimaryButton>
        </Stack>
      )}
    </Stack>
  );
};

export default PlayerProfile;
