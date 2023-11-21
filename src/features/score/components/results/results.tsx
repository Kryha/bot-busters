import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { pages } from "@/utils/router";
import { useBBWallet } from "@/hooks/bb-wallet";

import { styles } from "./styles";
import { text } from "../../../chat/text";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { isAnonymousSession, isUnverifiedSession } from "@/utils/session";

export const Results = () => {
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
    await connect();
    setMergeRequested(true);
  };

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.textContainer}>
        <Typography variant="h2">{text.amountBotsBusted}</Typography>
        <Typography variant="h1">{text.pointsWon(pointsWon)}</Typography>
      </Stack>
      <Stack sx={styles.textWrapper}>
        <Typography variant="body1">{text.addScoreToLeaderboard}</Typography>
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
              {text.addScore}
            </Button>
          )}
          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            onClick={() => void router.push(pages.home)}
            disabled={isConnecting}
          >
            {text.playNewGame}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
