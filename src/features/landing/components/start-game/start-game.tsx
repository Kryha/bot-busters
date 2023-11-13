//TODO: delete when changing layout
import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "@/assets/text";
import { pages } from "@/utils/router";
import { api } from "@/utils/api";
import { styles } from "./styles";

export const StartGame: FC = () => {
  const router = useRouter();
  const join = api.lobby.join.useMutation();

  return (
    <Stack sx={styles.textContainer}>
      <Typography variant="h1" sx={styles.title}>
        {text.landing.appName}
      </Typography>

      <Stack sx={styles.description}>
        <Typography variant="h5">{text.landing.descriptionPart1}</Typography>
        <Typography variant="h5">{text.landing.descriptionPart2}</Typography>
      </Stack>
      <Button
        variant="contained"
        disabled={join.status === "loading"}
        // TODO: LOGIN the user with anonymous account
        onClick={() => void router.push(pages.lobby)}
        sx={styles.startGameButton}
      >
        <Typography variant="h3" sx={styles.buttonText}>
          {text.landing.startNewGame}
        </Typography>
      </Button>
    </Stack>
  );
};
