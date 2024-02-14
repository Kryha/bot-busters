import type { FC } from "react";
import { Box, Button, Slider, Stack } from "@mui/material";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { AUDIO_OFF, AUDIO_ON } from "~/constants/index.js";

interface Props {
  volume: number;
  disabled?: boolean;
  changeVolume: (volume: number) => void;
}

export const VolumeSlider: FC<Props> = ({ volume, changeVolume, disabled }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    changeVolume(newValue as number);
  };

  const color = disabled ? "disabled" : "primary";

  return (
    <Box sx={{ width: 400 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Button variant="text" onClick={() => changeVolume(AUDIO_OFF)}>
          <VolumeDown color={color} />
        </Button>
        <Slider
          disabled={disabled}
          disableSwap={disabled}
          aria-label="Volume"
          value={volume}
          onChange={handleChange}
          min={AUDIO_OFF}
          max={AUDIO_ON}
          step={0.1}
        />
        <Button variant="text" onClick={() => changeVolume(AUDIO_ON)}>
          <VolumeUp color={color} />
        </Button>
      </Stack>
    </Box>
  );
};
