import type { FC } from "react";
import { Box, Button, Slider, Stack } from "@mui/material";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { AUDIO_OFF, AUDIO_ON } from "~/constants/index.js";

interface Props {
  volume: number;
  changeVolume: (volume: number) => void;
}
export const VolumeSlider: FC<Props> = ({ volume, changeVolume }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      changeVolume(newValue);
    } else {
      return; // will never be an array
    }
  };

  return (
    <Box sx={{ width: 400 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Button variant="text" onClick={() => changeVolume(AUDIO_OFF)}>
          <VolumeDown />
        </Button>
        <Slider
          aria-label="Volume"
          value={volume}
          onChange={handleChange}
          min={AUDIO_OFF}
          max={AUDIO_ON}
          step={0.1}
        />
        <Button variant="text" onClick={() => changeVolume(AUDIO_ON)}>
          <VolumeUp />
        </Button>
      </Stack>
    </Box>
  );
};
