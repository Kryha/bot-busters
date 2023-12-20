import { type FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { styles } from "./styles.js";
import { MenuButton } from "~/components/menu-dialog/menu-button";
import {
  BotBustersIcon,
  SoundOffIcon,
  SoundOnIcon,
  UserIcon,
} from "~/assets/icons";
import { pages } from "~/router";
import { useRouter } from "next/router";

interface Props {
  isVerifiedUser: boolean;
  setOpen: (open: boolean) => void;
  logout: () => Promise<void>;
}

export const UserMenu: FC<Props> = ({ isVerifiedUser, setOpen, logout }) => {
  const router = useRouter();
  // TODO: Add sound functionality eventually
  const [sound, setSound] = useState(true);
  const onSoundClick = () => {
    setSound(!sound);
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
  };

  return (
    <Stack sx={styles.wrapper}>
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
      {/*TODO: Move this to the menu*/}
      {isVerifiedUser && (
        <Button
          variant="contained"
          color="blueGrey"
          onClick={() => void logout()}
          sx={styles.button}
        >
          {text.general.signOut}
        </Button>
      )}
      <Stack direction={"row"} rowGap={2}>
        <Button variant="text" onClick={onSoundClick}>
          {sound ? <SoundOnIcon /> : <SoundOffIcon />}
        </Button>
        <MenuButton sx={styles.button} onClick={() => setOpen(true)} />
      </Stack>
    </Stack>
  );
};
