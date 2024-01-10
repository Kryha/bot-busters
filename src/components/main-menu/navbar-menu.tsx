import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";

import { useRouter } from "next/router.js";
import { pages } from "~/router.js";
import { NavbarMenuButton } from "~/components/main-menu/index.js";
import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";
import {
  BotBustersIcon,
  SoundOffIcon,
  SoundOnIcon,
  UserIcon,
} from "~/assets/icons/index.js";

interface Props {
  handleClose: () => void;
  soundOn: boolean;
  setSoundOn: (value: boolean) => void;
}

export const NavbarMenu: FC<Props> = ({ handleClose, soundOn, setSoundOn }) => {
  const router = useRouter();

  const onSoundClick = () => {
    setSoundOn(!soundOn);
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
    handleClose();
  };

  return (
    <Stack sx={styles.header}>
      <Stack sx={styles.userName}>
        <UserIcon />
        <Typography variant="h3">{text.general.username}</Typography>
      </Stack>
      <Button
        variant="text"
        sx={styles.mainLogo}
        onClick={() => handleNavigation(pages.home)}
      >
        <BotBustersIcon />
      </Button>
      <Stack direction={"row"} rowGap={2}>
        <Button variant="text" onClick={onSoundClick}>
          {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
        </Button>
        <NavbarMenuButton sx={styles.button} onClick={handleClose} />
      </Stack>
    </Stack>
  );
};
