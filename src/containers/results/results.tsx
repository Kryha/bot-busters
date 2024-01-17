import { Button, Stack, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useEffect, useState, type FC } from "react";

import { pages } from "~/router.js";
import { useBBWallet } from "~/service/bb-wallet.js";
import { api } from "~/utils/api.js";
import { isAnonymousSession, missingUsername } from "~/utils/session.js";

import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";

interface Props {
  gainedScore: number;
  botsBusted: number;
  totalBots: number;
}

export const Results: FC<Props> = ({ gainedScore, botsBusted, totalBots }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [mergeRequested, setMergeRequested] = useState(false);

  const { isConnecting, isConnected, connect, address, getSignature } =
    useBBWallet();
  const mergeScore = api.user.mergeScore.useMutation();

  useEffect(() => {
    const merge = async () => {
      if (isConnecting || !address || !isConnected || !mergeRequested) return;

      try {
        //TODO: Fix so user only presses the button once now signature is undefined on first press
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
          setMergeRequested(false);
        } else {
          await router.push(pages.usernameSelect);
          setMergeRequested(false);
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

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.textContainer}>
        <Typography variant="h2">
          {text.chat.amountBotsBusted(botsBusted, totalBots)}
        </Typography>
        <Typography variant="h1">{text.chat.pointsWon(gainedScore)}</Typography>
      </Stack>

      <Stack sx={styles.textWrapper}>
        <Typography variant="body1">
          {text.chat.addScoreToLeaderboard}
        </Typography>
        <Stack sx={styles.buttonContainer}>
          {(isAnonymousSession(session) || missingUsername(session)) && (
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
