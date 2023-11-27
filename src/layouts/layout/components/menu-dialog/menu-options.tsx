import { type FC } from "react";
import { useRouter } from "next/router";
import { Button, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/utils/router.js";

import { styles } from "./styles.js";

interface Props {
  handleClose: () => void;
}

export const MenuOptions: FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const join = api.lobby.join.useMutation();

  const handleNavigation = (path: string) => {
    void router.push(path);
    handleClose();
  };

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
            onClick={() => handleNavigation(pages.lobby)}
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
          onClick={() => handleNavigation(pages.playerProfile)}
        >
          <Typography variant="h1" color="common.black">
            {text.general.playerProfile}
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={styles.menuButton}
          color="customGrey"
          onClick={() => handleNavigation(pages.leaderboard)}
        >
          <Typography variant="h1" color="common.black">
            {text.general.dailyLeaderboard}
          </Typography>
        </Button>
        <Button variant="text" sx={styles.menuButton} color="customGrey">
          <Typography
            variant="h1"
            color="common.black"
            onClick={() => handleNavigation(pages.rules)}
          >
            {text.general.howToPlay}
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={styles.menuButton}
          color="customGrey"
          onClick={() => handleNavigation(pages.login)}
        >
          <Typography variant="h1" color="common.black">
            {text.general.connectWallet}
          </Typography>
        </Button>
      </Stack>
    </>
  );
};
