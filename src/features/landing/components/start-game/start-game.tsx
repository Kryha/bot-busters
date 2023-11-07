import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { text } from "@/assets/text";
import { api } from "@/utils/api";
import { styles } from "./styles";
import { signIn } from "next-auth/react";

export const StartGame: FC = () => {
  const router = useRouter();
  const join = api.lobby.join.useMutation();

  const handleStartGame = () => {
    void signIn("credentials", {});
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
        onClick={handleStartGame}
        sx={styles.startGameButton}
      >
        <Typography variant="h3" sx={styles.buttonText}>
          {text.landing.startNewGame}
        </Typography>
      </Button>
    </Stack>
  );
};
