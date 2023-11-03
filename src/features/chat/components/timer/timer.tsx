/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect, type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";

interface Props {
  matchDurationInSeconds: number;

  setIsFinished: (isFinished: boolean) => void;
}

export const Timer: FC<Props> = ({
  matchDurationInSeconds,

  setIsFinished,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    matchDurationInSeconds
  );
  const updateAtInterval = 500;
  const alertTimeInSeconds = remainingSeconds < 10;
  useEffect(() => {
    if (remainingSeconds === 0) setIsFinished(true);
    const interval = setInterval(() => {
      if (remainingSeconds > 0) {
        setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, updateAtInterval);

    return () => {
      clearInterval(interval);
    };
  }, [remainingSeconds, setIsFinished]);

  const progress = (remainingSeconds / matchDurationInSeconds) * 100;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedCountdown = text.general.formattedCountdown(minutes, seconds);

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progress, alertTimeInSeconds)}>
        <Stack sx={styles.countdownWrapper}>
          <Typography
            variant="caption"
            color="common.white"
            sx={styles.countdown}
          >
            {text.general.countdown(formattedCountdown)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
