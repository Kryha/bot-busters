import { type FC, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { ALERT_TIME_MS } from "~/constants/main.js";

import { styles } from "./styles.js";

interface Props {
  time: number;
  duration: number;
  alertTime?: number;
  stage?: MatchStage;
  definedStage?: MatchStage;
}

export const Timer: FC<Props> = ({
  time,
  duration,
  alertTime = ALERT_TIME_MS,
  stage,
  definedStage,
}) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(duration);

  useEffect(() => {
    if (time) {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - time;
        const newRemainingTime = Math.max(0, duration - elapsedTime);
        setRemainingTime(newRemainingTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
    setRemainingTime(null);
  }, [duration, time]);

  if (!time || !remainingTime) return <></>;

  const progress = (remainingTime / duration) * 100;
  const seconds = Math.floor(remainingTime / 1000);
  const formattedCountdown = text.general.formattedCountdown(
    Math.floor(seconds / 60),
    seconds % 60,
  );

  return (
    <Stack sx={styles.wrapper}>
      <Stack sx={styles.progress(progress, remainingTime < alertTime)} />
      <Stack sx={styles.countdownWrapper}>
        <Typography
          variant="caption"
          color="common.black"
          sx={styles.countdown}
        >
          {formattedCountdown}
        </Typography>
      </Stack>
    </Stack>
  );
};
