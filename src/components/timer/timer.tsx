import { type FC, useEffect, useState } from "react";
import { type MatchStage } from "~/types/index.js";
import { type TrackId } from "~/constants/sounds.js";
import { usePlayMusic } from "~/hooks/sounds.js";
import { Stack, Typography } from "@mui/material";
import { text } from "~/assets/text/index.js";
import {
  ALERT_TIME_MS,
  MATCHMAKING_DELAY,
  SPLASH_SCREEN_TIME_MS,
} from "~/constants/main.js";
import { pages } from "~/router.js";
import { styles } from "./styles.js";

interface Props {
  time: number;
  duration: number;
  alertTime?: number;
  stage?: MatchStage;
  definedStage?: MatchStage;
}

interface PlayOptions {
  track: TrackId;
  loop: boolean;
  delayInSeconds: number;
}

const DOUBLETIME_OUTRO_MS = 3000;

export const Timer: FC<Props> = ({
  time,
  duration,
  alertTime = ALERT_TIME_MS,
  stage,
  definedStage,
}) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(duration);
  const [playOptions, setPlayOptions] = useState<PlayOptions>({
    track: "GamePlay",
    loop: true,
    delayInSeconds: 0,
  });

  usePlayMusic(
    playOptions.track,
    playOptions.loop,
    pages.match,
    playOptions.delayInSeconds,
    stage,
    definedStage,
  );

  useEffect(() => {
    if (time) {
      const intervalId = setInterval(() => {
        const elapsedTime =
          Date.now() - time - SPLASH_SCREEN_TIME_MS - MATCHMAKING_DELAY;
        const newRemainingTime = Math.max(0, duration - elapsedTime);
        setRemainingTime(newRemainingTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
    setRemainingTime(null);
  }, [duration, time]);

  useEffect(() => {
    // Check if remainingTime is defined and less than alertTime to avoid unnecessary checks
    if (remainingTime && remainingTime < alertTime) {
      setPlayOptions({
        track:
          remainingTime < DOUBLETIME_OUTRO_MS
            ? "GameDoubleTimeOutro"
            : "GameDoubleTime",
        loop: remainingTime >= DOUBLETIME_OUTRO_MS,
        delayInSeconds: 0,
      });
    }
  }, [remainingTime, alertTime]);

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
