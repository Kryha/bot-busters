import { type FC, useState } from "react";
import { Button, Menu, Stack, Typography } from "@mui/material";
import { SoundOffIcon, SoundOnIcon } from "~/assets/icons/index.js";
import { VolumeSlider } from "~/components/audio-settings/volume-slider.jsx";
import {
  useChangeMasterVolume,
  useChangeMusicVolume,
  useChangeSFXVolume,
} from "~/hooks/use-change-volume.js";
import { AUDIO_OFF } from "~/constants/main.js";
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
          <Typography>Master Audio</Typography>
          <VolumeSlider
            volume={masterVolume}
            changeVolume={changeMasterVolume}
          />
        </Stack>
        <Stack sx={styles.menuItem}>
          <Typography>Music Audio</Typography>
          <VolumeSlider volume={musicVolume} changeVolume={changeMusicVolume} />
        </Stack>
        <Stack sx={styles.menuItem}>
          <Typography>SFX Audio</Typography>
          <VolumeSlider volume={sfxVolume} changeVolume={changeSFXVolume} />
        </Stack>
      </Menu>
    </>
  );
};
