import { type FC, useCallback } from "react";
import { Button } from "@mui/material";
import { SoundOffIcon, SoundOnIcon } from "~/assets/icons/index.js";
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

export const AudioSettings: FC = () => {
  const { changeMasterVolume, masterVolume } = useChangeMasterVolume();
  const { changeSFXVolume, sfxVolume } = useChangeSFXVolume();
  const { changeMusicVolume, musicVolume } = useChangeMusicVolume();

  const disableAudio = useCallback(() => {
    changeMasterVolume(
      masterVolume === AUDIO_OFF ? DEFAULT_MASTER_VOLUME : AUDIO_OFF,
    );
    changeSFXVolume(sfxVolume === AUDIO_OFF ? DEFAULT_SFX_VOLUME : AUDIO_OFF);
    changeMusicVolume(
      musicVolume === AUDIO_OFF ? DEFAULT_MUSIC_VOLUME : AUDIO_OFF,
    );
  }, [
    changeMasterVolume,
    masterVolume,
    changeSFXVolume,
    sfxVolume,
    changeMusicVolume,
    musicVolume,
  ]);

  // TODO: Add back once designs are available

  // const open = Boolean(anchorEl);
  //  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  //
  //
  // // disable music and sfx sliders when master volume is off
  // const disabled = masterVolume === AUDIO_OFF;
  //
  // const handleReset = () => {
  //   changeMasterVolume(DEFAULT_MASTER_VOLUME);
  //   changeSFXVolume(DEFAULT_SFX_VOLUME);
  //   changeMusicVolume(DEFAULT_MUSIC_VOLUME);
  // };
  //

  return (
    <>
      <Button variant="text" onClick={disableAudio}>
        {masterVolume === AUDIO_OFF ? <SoundOffIcon /> : <SoundOnIcon />}
      </Button>
      {/*<Menu*/}
      {/*  open={open}*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  onClose={() => handleClose()}*/}
      {/*  transformOrigin={{ horizontal: "right", vertical: "top" }}*/}
      {/*  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}*/}
      {/*  MenuListProps={{*/}
      {/*    sx: styles.menu,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Stack sx={styles.menuItem}>*/}
      {/*    <Typography variant="caption" sx={styles.text}>*/}
      {/*      {text.audio.master}*/}
      {/*    </Typography>*/}
      {/*    <VolumeSlider*/}
      {/*      volume={masterVolume}*/}
      {/*      changeVolume={changeMasterVolume}*/}
      {/*    />*/}
      {/*  </Stack>*/}
      {/*  <Stack sx={styles.menuItem}>*/}
      {/*    <Typography variant="caption" sx={styles.text}>*/}
      {/*      {text.audio.music}*/}
      {/*    </Typography>*/}
      {/*    <VolumeSlider*/}
      {/*      volume={musicVolume}*/}
      {/*      changeVolume={changeMusicVolume}*/}
      {/*      disabled={disabled}*/}
      {/*    />*/}
      {/*  </Stack>*/}
      {/*  <Stack sx={styles.menuItem}>*/}
      {/*    <Typography variant="caption" sx={styles.text}>*/}
      {/*      {text.audio.sfx}*/}
      {/*    </Typography>*/}
      {/*    <VolumeSlider*/}
      {/*      volume={sfxVolume}*/}
      {/*      changeVolume={changeSFXVolume}*/}
      {/*      disabled={disabled}*/}
      {/*    />*/}
      {/*  </Stack>*/}
      {/*  <Stack sx={styles.resetButton}>*/}
      {/*    <Button variant="text" sx={styles.button} onClick={handleReset}>*/}
      {/*      Reset to Default*/}
      {/*    </Button>*/}
      {/*  </Stack>*/}
      {/*</Menu>*/}
    </>
  );
};
