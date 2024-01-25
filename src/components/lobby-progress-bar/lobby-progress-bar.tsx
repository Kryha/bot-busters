import { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import { text } from "~/assets/text/index.js";
import { DEFAULT_MAX_PLAYERS_PER_ROOM } from "~/constants/index.js";
import { styles } from "./styles.js";

interface Props {
  progress: number;
}

export const LobbyProgressBar: FC<Props> = ({ progress }) => {
  const progressPercentage = (progress / DEFAULT_MAX_PLAYERS_PER_ROOM) * 100;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progressPercentage)} />
      <Stack sx={styles.loadingWrapper}>
        <Typography variant="body2" color="common.black" sx={styles.loading}>
          {text.lobby.matchMaking}
        </Typography>
      </Stack>
    </Stack>
  );
};
