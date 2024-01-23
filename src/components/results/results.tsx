import { Stack } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useEffect, useState, type FC } from "react";

import { pages } from "~/router.js";
import { useBBWallet } from "~/service/bb-wallet.js";
import { api } from "~/utils/api.js";

import { text } from "~/assets/text/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { Score } from "~/components/score/index.js";
import { type AchievementId } from "~/types/index.js";
import { isAnonymousSession, missingUsername } from "~/utils/session.js";
import { styles } from "./styles.js";

interface Props {
  gainedScore: number;
  botsBusted: number;
  totalBots: number;
  achievements: AchievementId[];
}

export const Results: FC<Props> = ({ gainedScore, achievements }) => {
  const { data: session } = useSession();
  const router = useRouter();

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
    await connect();
    setMergeRequested(true);
  };

  return (
    <Stack sx={styles.wrapper}>
      <Score gainedScore={gainedScore} achievements={achievements} />
      <Stack sx={styles.buttonContainer}>
        {(isAnonymousSession(session) || missingUsername(session)) && (
          <PrimaryButton
            sx={styles.button}
            onClick={() => void handleConnect()}
            disabled={isConnecting}
          >
            {text.chat.addScore}
          </PrimaryButton>
        )}

        <PrimaryButton
          sx={styles.button}
          onClick={() => void router.push(pages.home)}
          disabled={isConnecting}
        >
          {text.chat.playNewGame}
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};
