import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";

import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";
import { fakeUsername } from "~/constants/fake-data/landing.js";
import { isValidSession } from "~/utils/session.js";
import { PlayerTable } from "~/components/index.js";
import { fakePlayerProfile } from "~/constants/fake-data/player-profile.jsx";
import { styles } from "../styles/pages/player-profile.js";

const PlayerProfile = () => {
  const { push } = useRouter();
  const { data: sessionData } = useSession();
  const isAuthenticated = isValidSession(sessionData);
  const join = api.lobby.join.useMutation();
  const openDailyHandler = () => void push(pages.leaderboard);
  const isDisabled = join.status === "loading";
  const title = isAuthenticated
    ? text.playerProfile.hiPlayer(fakeUsername)
    : text.playerProfile.yourPlayerProfile;

  return (
    <Stack sx={styles.textContainer}>
      <Typography variant="h1" color="common.black">
        {title}
      </Typography>
      <Stack sx={styles.table}>
        <PlayerTable playerProfile={fakePlayerProfile} />
      </Stack>
      <Stack sx={styles.actions}>
        {!isAuthenticated && (
          <>
            <Typography variant="body1">
              {text.playerProfile.createProfile}
            </Typography>
            <Button
              variant="contained"
              color="blueGrey"
              disabled={isDisabled}
              onClick={openDailyHandler}
              sx={styles.openDailyButton}
            >
              {text.playerProfile.addScoreToLeaderboard}
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default PlayerProfile;