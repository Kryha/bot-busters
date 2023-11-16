import { useState, type FC, useEffect } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "@/assets/text";
import { styles } from "./styles";
import { ALERT_TIME_MS, CHAT_TIME_MS } from "@/constants/main";
import { useStore } from "@/store";

export const Timer: FC = () => {
  const [remainingTime, setRemainingTime] = useState<number | null>(
    CHAT_TIME_MS
  );
  const createdAt = useStore((state) => state.createdAt);

  useEffect(() => {
    if (createdAt) {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - createdAt;
        const newRemainingTime = Math.max(0, CHAT_TIME_MS - elapsedTime);
        setRemainingTime(newRemainingTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
    setRemainingTime(null);
  }, [createdAt]);

  if (!createdAt || !remainingTime) return <></>;

  const progress = (remainingTime / CHAT_TIME_MS) * 100;
  const seconds = Math.floor(remainingTime / 1000);
  const formattedCountdown = text.general.formattedCountdown(
    Math.floor(seconds / 60),
    seconds % 60
  );

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progress, remainingTime < ALERT_TIME_MS)}>
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
