import { useState, type FC, useEffect } from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

export const Timer: FC = () => {
  const [progress, setProgress] = useState(100);
  const totalTimeInSeconds = 60;
  const updateAtInterval = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress > 0) {
        setProgress((prevProgress) => prevProgress - 100 / totalTimeInSeconds);
      } else {
        clearInterval(interval);
      }
    }, updateAtInterval);

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: `${progress}%`,
          height: "16px",
          backgroundColor: "customGrey.main",
          alignContent: "center",
        }}
      >
        <Typography variant="caption" sx={{ textAlign: "end" }}>
          {3.1}
        </Typography>
      </Stack>
    </Stack>
  );
};
