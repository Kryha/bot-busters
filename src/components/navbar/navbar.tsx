import { type FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { type FC } from "react";
import { AudioSettings } from "~/components/audio-settings/index.js";
import { MainMenu } from "~/components/main-menu/index.js";
import { MenuButton } from "~/components/main-menu/menu-button.jsx";

import { BotBustersIcon, UserIcon } from "~/assets/icons/index.js";
import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import { api } from "~/utils/api.js";

import { usePlaySFX } from "~/hooks/sounds.js";
import { styles } from "./styles.js";

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const playSfx = usePlaySFX();
  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const handleNavigation = (path: string) => {
    void playSfx("./sounds/BB_UI_Blip_Up.mp3");
    void router.push(path);
  };

  const isHomePage = router.pathname === pages.home;

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
        {!isHomePage && (
          <Button
            variant="text"
            sx={styles.mainLogo}
            onClick={() => handleNavigation(pages.home)}
          >
            <BotBustersIcon />
          </Button>
        )}
        <Stack direction={"row"} rowGap={4} sx={styles.navbarEnd}>
          <AudioSettings />
          <MenuButton
            sx={styles.button}
            onClick={() => {
              void playSfx("./sounds/BB_UI_Blip_Up.mp3");
              setIsMenuOpen(true)
            }}
          />
        </Stack>
      </Stack>
      <MainMenu open={isMenuOpen} setOpen={setIsMenuOpen} />
    </Stack>
  );
};
