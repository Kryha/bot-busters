import { type FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router.js";

import { text } from "~/assets/text/index.js";

import { styles } from "./styles.js";
import {
  BotBustersIcon,
  SoundOffIcon,
  SoundOnIcon,
  UserIcon,
} from "~/assets/icons";
import { pages } from "~/router";
import { MenuButton } from "~/components/menu-dialog/menu-button";

interface Props {
  handleClose: () => void;
}

export const Header: FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const [sound, setSound] = useState(true);

  const onSoundClick = () => {
    setSound(!sound);
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
          {sound ? <SoundOnIcon /> : <SoundOffIcon />}
        </Button>
        <MenuButton sx={styles.button} onClick={handleClose} />
      </Stack>
    </Stack>
  );
};
