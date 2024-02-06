import { Stack } from "@mui/material";
import { useRouter } from "next/router.js";
import { type FC } from "react";

import { pages } from "~/router.js";
import { api } from "~/utils/api.js";
import { text } from "~/assets/text/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { Score } from "~/components/score/index.js";
import { type PlayerType } from "~/types/index.js";
import { styles } from "./styles.js";

interface Props {
  player: PlayerType;
}

export const Results: FC<Props> = ({ player }) => {
  const router = useRouter();

  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const isConnectButtonHidden = !!(
    loggedUser.data?.address && loggedUser.data.username
  );

  return (
    <Stack sx={styles.wrapper}>
      <Score player={player} />

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
