import { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";
import { DEFAULT_MAX_PLAYERS } from "~/constants";

interface Props {
  progress: number;
}

export const LobbyProgressBar: FC<Props> = ({ progress }) => {
  const progressPercentage = (progress / DEFAULT_MAX_PLAYERS) * 100;
  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progressPercentage)} />
      <Stack sx={styles.loadingWrapper}>
        <Typography variant="body2" sx={styles.loading}>
          {text.lobby.matchMaking}
        </Typography>
      </Stack>
    </Stack>
  );
};
