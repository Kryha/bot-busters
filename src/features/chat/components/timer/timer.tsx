import { useState, useEffect, type FC } from "react";
import { Stack, Typography } from "@mui/material";
import { text } from "@/assets/text";
import { styles } from "./styles";
import { CHAT_TIME_MS } from "@/constants/main";

interface Props {
  countdown: number;
}

export const Timer: FC<Props> = ({ countdown }) => {
  const [remainingTime, setRemainingTime] = useState(countdown);
  const updateAtInterval = 1000;
  const alertTime = 30000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1000);
      } else {
        clearInterval(interval);
      }
    }, updateAtInterval);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const progress = (remainingTime / CHAT_TIME_MS) * 100;
  const seconds = Math.floor(remainingTime / 1000);
  const formattedCountdown = text.general.formattedCountdown(
    Math.floor(seconds / 60),
    seconds % 60
  );

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progress, remainingTime < alertTime)}>
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
