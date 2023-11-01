import { useState, useEffect, type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";

export const Timer: FC = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(40);
  const initialTotalSeconds = 40; // Set the initial total seconds here
  const updateAtInterval = 1000; // Update the timer every second

  useEffect(() => {
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
  }, [remainingSeconds]);

  const progress = (remainingSeconds / initialTotalSeconds) * 100;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedCountdown = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progress, remainingSeconds < 30)}>
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
