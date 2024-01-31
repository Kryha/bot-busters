import { type FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { text } from "~/assets/text/index.js";

import {
  BotBustersIcon,
  SoundOffIcon,
  SoundOnIcon,
  UserIcon,
} from "~/assets/icons/index.js";
import { MenuButton } from "~/components/main-menu/menu-button.jsx";
import { MainMenu } from "~/components/main-menu/index.js";
import { pages } from "~/router.js";
import { styles } from "./styles.js";
import { api } from "~/utils/api.js";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Navbar: FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();
  const [soundOn, setSoundOn] = useState(true);

  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const onSoundClick = () => {
    setSoundOn(!soundOn);
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
  };

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.wrapper}>
        <Stack
          onClick={() => handleNavigation(pages.playerProfile)}
          sx={{ ...styles.userName, ...styles.navbarStart }}
        >
          <Stack sx={styles.userIcon}>
            <UserIcon />
          </Stack>
          <Typography variant="h3" sx={styles.userNameText}>
            {loggedUser.data?.username ?? text.general.username}
          </Typography>
        </Stack>
        <Button
          variant="text"
          sx={styles.mainLogo}
          onClick={() => handleNavigation(pages.home)}
        >
          <BotBustersIcon />
        </Button>
        <Stack direction={"row"} rowGap={2} sx={styles.navbarEnd}>
          <Button variant="text" onClick={onSoundClick}>
            {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
          </Button>
          <MenuButton sx={styles.button} onClick={() => setOpen(true)} />
        </Stack>
      </Stack>
      <MainMenu
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        open={open}
        setOpen={setOpen}
      />
    </Stack>
  );
};
