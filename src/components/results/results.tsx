import { Stack } from "@mui/material";
import { useRouter } from "next/router.js";
import { type FC } from "react";

import { pages } from "~/router.js";
import { api } from "~/utils/api.js";
import { text } from "~/assets/text/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { Score } from "~/components/score/index.js";
import { type AchievementId } from "~/types/index.js";
import { styles } from "./styles.js";

interface Props {
  gainedScore: number;
  botsBusted: number;
  totalBots: number;
  achievements: AchievementId[];
}

export const Results: FC<Props> = ({ gainedScore, achievements }) => {
  const router = useRouter();

  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const isConnectButtonHidden = !!(
    loggedUser.data?.address && loggedUser.data.username
  );

  return (
    <Stack sx={styles.wrapper}>
      <Score gainedScore={gainedScore} achievements={achievements} />
      <Stack sx={styles.buttonContainer}>
        {loggedUser.isLoading || (
          <>
            <PrimaryButton
              sx={styles.button}
              onClick={() => void router.push(pages.lobby)}
            >
              {text.chat.playAgain}
            </PrimaryButton>
            {!isConnectButtonHidden ? (
              <PrimaryButton
                sx={styles.button}
                onClick={() => void router.push(pages.login)}
              >
                {text.chat.addScore}
              </PrimaryButton>
            ) : (
              <PrimaryButton
                sx={styles.button}
                onClick={() => void router.push(pages.leaderboard)}
              >
                {text.chat.viewLeaderboard}
              </PrimaryButton>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};
