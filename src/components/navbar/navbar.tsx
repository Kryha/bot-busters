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
} from "~/assets/icons";
import { MenuButton } from "~/components/main-menu/menu-button.jsx";
import { MainMenu } from "~/components/main-menu/index.js";
import { pages } from "~/router.js";

interface Props {
  isVerifiedUser: boolean;
  isGamePlayed: boolean;
  username: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disconnectWallet: () => Promise<void>;
  points: number;
}

export const Navbar: FC<Props> = ({
  isVerifiedUser,
  open,
  setOpen,
  disconnectWallet,
}) => {
  const router = useRouter();
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
            onClick={() => void logOut()}
            sx={styles.button}
          >
            {text.general.signOut}
          </Button>
        )}
        <Stack direction={"row"} rowGap={2}>
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
