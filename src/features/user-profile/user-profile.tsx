import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { text } from "@/assets/text";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { fakeUsername } from "@/constants/fake-data/landing";
import { useSession } from "next-auth/react";
import { isValidSession } from "@/utils/session";
import { PlayerTable } from "@/components";
import { fakePlayerProfile } from "@/constants/fake-data/player-profile";

export const UserProfile = () => {
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
