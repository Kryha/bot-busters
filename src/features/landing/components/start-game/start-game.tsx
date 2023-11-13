//TODO: delete when changing layout
import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "@/assets/text";
import { api } from "@/utils/api";
import { styles } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { pages } from "@/utils/router";
import { isValidSession } from "@/utils/session";

export const StartGame: FC = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const join = api.lobby.join.useMutation();

  const handleStartGame = async () => {
    if (!isValidSession(sessionData)) {
      await signIn("credentials", {});
    }
    return router.push(pages.lobby);
  };

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
        onClick={() => void handleStartGame()}
        sx={styles.startGameButton}
      >
        <Typography variant="h3" sx={styles.buttonText}>
          {text.landing.startNewGame}
        </Typography>
      </Button>
    </Stack>
  );
};
