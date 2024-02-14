import { type FC, useState } from "react";
import { Button, Menu, Stack, Typography } from "@mui/material";
import { SoundOffIcon, SoundOnIcon } from "~/assets/icons/index.js";
import { VolumeSlider } from "~/components/audio-settings/volume-slider.jsx";
import {
  useChangeMasterVolume,
  useChangeMusicVolume,
  useChangeSFXVolume,
} from "~/hooks/volume.js";
import {
  AUDIO_OFF,
  DEFAULT_MASTER_VOLUME,
  DEFAULT_MUSIC_VOLUME,
  DEFAULT_SFX_VOLUME,
} from "~/constants/main.js";

import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";

export const AudioSettings: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { changeMasterVolume, masterVolume } = useChangeMasterVolume();
  const { changeSFXVolume, sfxVolume } = useChangeSFXVolume();
  const { changeMusicVolume, musicVolume } = useChangeMusicVolume();

  const handleReset = () => {
    changeMasterVolume(DEFAULT_MASTER_VOLUME);
    changeSFXVolume(DEFAULT_SFX_VOLUME);
    changeMusicVolume(DEFAULT_MUSIC_VOLUME);
  };

  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        {masterVolume === AUDIO_OFF ? <SoundOffIcon /> : <SoundOnIcon />}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => handleClose()}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          sx: styles.menu,
        }}
      >
        <Stack sx={styles.menuItem}>
          <Typography variant="caption" sx={styles.text}>
            {text.audio.master}
          </Typography>
          <VolumeSlider
            volume={masterVolume}
            changeVolume={changeMasterVolume}
          />
        </Stack>
        <Stack sx={styles.menuItem}>
          <Typography variant="caption" sx={styles.text}>
            {text.audio.music}
          </Typography>
          <VolumeSlider
            volume={musicVolume}
            changeVolume={changeMusicVolume}
            disabled={masterVolume === AUDIO_OFF}
          />
        </Stack>
        <Stack sx={styles.menuItem}>
          <Typography variant="caption" sx={styles.text}>
            {text.audio.sfx}
          </Typography>
          <VolumeSlider
            volume={sfxVolume}
            changeVolume={changeSFXVolume}
            disabled={masterVolume === AUDIO_OFF}
          />
        </Stack>
        <Stack sx={styles.resetButton}>
          <Button variant="text" sx={styles.button} onClick={handleReset}>
            Reset to Default
          </Button>
        </Stack>
      </Menu>
    </>
  );
};
