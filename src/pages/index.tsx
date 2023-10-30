/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useSession } from "next-auth/react";
import { Page } from "@/layouts";
import { isValidSession } from "@/utils/session";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { AnonymousAuthButton, LogoutButton } from "@/components";
import { pages } from "@/utils/router";
import { text } from "@/assets/text";
import { Leaderboard } from "@/features";
import { styles } from "./styles";
import { LeaderboardToggleButton } from "./leaderboard-toggle";

// TODO: define text in another file
export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();
  // TODO: finish and fix styling and text
  return (
    <Page>
      <Stack>
        <Stack sx={styles.statsWrapper}>
          <Stack sx={styles.statsContainer}>
            {/* TODO: change colors */}
            {/*  button needs to be the same size as text */}
            <Button
              variant="contained"
              size="medium"
              sx={styles.connectButton}
              onClick={() => void router.push(pages.login)}
            >
              {text.landing.connectLeoWallet}
            </Button>
            <Typography variant="body1">{text.landing.toPlayWith}</Typography>
          </Stack>
        </Stack>
        <Stack sx={styles.textContainer}>
          <Typography variant="h1" sx={styles.title}>
            {text.landing.appName}
          </Typography>

          <Stack sx={styles.description}>
            <Typography variant="h5">
              {text.landing.descriptionPart1}
            </Typography>
            <Typography variant="h5">
              {text.landing.descriptionPart2}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            disabled={join.status === "loading"}
            onClick={() => void router.push(pages.lobby)}
            sx={styles.startGameButton}
            color="info"
          >
            <Typography variant="h3">{text.landing.startNewGame}</Typography>
          </Button>
          <LeaderboardToggleButton />
          <Leaderboard />
        </Stack>
      </Stack>
    </Page>
  );
}
