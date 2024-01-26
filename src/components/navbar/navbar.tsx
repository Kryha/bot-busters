import { type FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { text } from "~/assets/text/index.js";
import { styles } from "~/components/navbar/styles.js";
import {
  BotBustersIcon,
  SoundOffIcon,
  SoundOnIcon,
  UserIcon,
} from "~/assets/icons/index.js";
import { MenuButton } from "~/components/main-menu/menu-button.jsx";
import { MainMenu } from "~/components/main-menu/index.js";
import { pages } from "~/router.js";
import { useBBWallet } from "~/service/bb-wallet.js";

interface Props {
  isVerifiedUser: boolean;
  username: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  points: number;
}

export const Navbar: FC<Props> = ({ isVerifiedUser, open, setOpen }) => {
  const router = useRouter();
  const { disconnect: disconnectWallet } = useBBWallet();

  const [soundOn, setSoundOn] = useState(true);

  const logOut = async () => {
    await signOut();
    await disconnectWallet();
    sessionStorage.clear();
  };

  const onSoundClick = () => {
    setSoundOn(!soundOn);
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
  };

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.wrapper}>
        <Stack sx={{ ...styles.userName, ...styles.navbarStart }}>
          <Stack sx={styles.userIcon}>
            <UserIcon />
          </Stack>
          <Typography variant="h3" sx={styles.userNameText}>
            {text.general.username}
          </Typography>
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
            onClick={() => void logOut()}
            sx={styles.button}
          >
            {text.general.signOut}
          </Button>
        )}
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
