import { type FC } from "react";
import { useRouter } from "next/router";
import { Button, Stack, Typography } from "@mui/material";

import { text } from "@/assets/text";
import { api } from "@/utils/api";
import { pages } from "@/utils/router";
import { styles } from "./styles";

interface Props {
  isAuthenticated: boolean;
}

export const MenuOptions: FC<Props> = ({ isAuthenticated }) => {
  const router = useRouter();
  const join = api.lobby.join.useMutation();

  return (
    <>
      <Stack sx={styles.menuButtonContainer}>
        <Stack sx={styles.startGame}>
          <Button
            variant="text"
            sx={styles.menuButton}
            color="customGrey"
            disabled={join.status === "loading"}
            // TODO: LOGIN the user with anonymous account
            onClick={() => void router.push(pages.lobby)}
          >
            <Typography variant="h1" color="common.black">
              {text.general.startNewGame}
            </Typography>
          </Button>
        </Stack>
        <Button
          variant="text"
          sx={styles.menuButton}
          color="customGrey"
          disabled={!isAuthenticated}
          onClick={() => void router.push(pages.playerProfile)}
        >
          <Typography variant="h1" color="common.black">
            {text.general.playerProfile}
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={styles.menuButton}
          color="customGrey"
          onClick={() => void router.push(pages.leaderboard)}
        >
          <Typography variant="h1" color="common.black">
            {text.general.dailyLeaderboard}
          </Typography>
        </Button>
        <Button variant="text" sx={styles.menuButton} color="customGrey">
          <Typography variant="h1" color="common.black">
            {text.general.howToPlay}
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={styles.menuButton}
          color="customGrey"
          onClick={() => void router.push(pages.login)}
        >
          <Typography variant="h1" color="common.black">
            {text.general.connectWallet}
          </Typography>
        </Button>
      </Stack>
    </>
  );
};
