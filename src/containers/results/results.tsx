import { type FC, useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import { pages } from "~/router.js";
import { useBBWallet } from "~/service/bb-wallet.js";
import { api } from "~/utils/api.js";
import { isAnonymousSession, isUnverifiedSession } from "~/utils/session.js";
import { type MatchStateType } from "~/types";

import { styles } from "./styles.js";
import { text } from "~/assets/text";

interface Props {
  matchState: MatchStateType;
}

export const Results: FC<Props> = ({ matchState }) => {
  const { data: session } = useSession();
  const router = useRouter();
  // TODO: get points from server
  const pointsWon = 30;

  const [mergeRequested, setMergeRequested] = useState(false);

  const { isConnecting, isConnected, connect, address, getSignature } =
    useBBWallet();
  const mergeScore = api.user.mergeScore.useMutation();

  useEffect(() => {
    const merge = async () => {
      if (isConnecting || !address || !isConnected || !mergeRequested) return;

      setMergeRequested(false);
      try {
        const signature = await getSignature();
        if (!signature) return;

        const { isUsernameSet } = await mergeScore.mutateAsync({
          signature,
          address,
        });

        if (isUsernameSet) {
          await signIn("credentials", {
            address,
            signature,
            callbackUrl: pages.home,
          });
        } else {
          await router.push(pages.usernameSelect);
        }
      } catch (error) {
        console.error(error);
      }
    };
    void merge();
  }, [
    address,
    mergeScore,
    getSignature,
    isConnecting,
    isConnected,
    router,
    mergeRequested,
  ]);

  const handleConnect = async () => {
    setMergeRequested(true);
    await connect();
  };

  if (matchState !== "results") return;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.textContainer}>
        <Typography variant="h2">{text.chat.amountBotsBusted}</Typography>
        <Typography variant="h1">{text.chat.pointsWon(pointsWon)}</Typography>
      </Stack>
      <Stack sx={styles.textWrapper}>
        <Typography variant="body1">
          {text.chat.addScoreToLeaderboard}
        </Typography>
        <Stack sx={styles.buttonContainer}>
          {(isAnonymousSession(session) || isUnverifiedSession(session)) && (
            <Button
              variant="contained"
              size="large"
              sx={styles.button}
              color="blueGrey"
              onClick={() => void handleConnect()}
              disabled={isConnecting}
            >
              {text.chat.addScore}
            </Button>
          )}
          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            onClick={() => void router.push(pages.home)}
            disabled={isConnecting}
          >
            {text.chat.playNewGame}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
