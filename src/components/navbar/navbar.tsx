import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { type FC, useState } from "react";
import { usePlaySFX } from "~/hooks/sounds.js";

import { AudioSettings } from "~/components/audio-settings/index.js";
import { ExitLobbyButton, MainMenu } from "~/components/main-menu/index.js";
import { MenuButton } from "~/components/main-menu/menu-button.jsx";

import { BotBustersIcon, UserIcon } from "~/assets/icons/index.js";
import { text } from "~/assets/text/index.js";
import { pages } from "~/router.js";
import { api } from "~/utils/api.js";
import { LogoButton } from "~/components/logo-button/index.js";
import { styles } from "./styles.js";

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const playSfx = usePlaySFX();
  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const handleNavigation = (path: string) => {
    playSfx("NavClick");
    void router.push(path);
  };

  const isHomePage = router.pathname === pages.home;
  const isLobbyPage = router.pathname === pages.lobby;

  return (
    <Stack component="header" sx={styles.container}>
      {isLobbyPage ? (
        <Stack sx={styles.lobby}>
          <AudioSettings />
          <ExitLobbyButton
            sx={styles.button}
            onClick={() => handleNavigation(pages.home)}
          />
        </Stack>
      ) : (
        <>
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
              <LogoButton
                variant="text"
                sx={styles.mainLogo}
                onClick={() => {
                  playSfx("BlipUp");
                  void router.push(pages.home);
                }}
              >
                <BotBustersIcon />
              </LogoButton>
            )}
            <Stack direction={"row"} rowGap={4} sx={styles.navbarEnd}>
              <AudioSettings />
              <MenuButton
                sx={styles.button}
                onClick={() => {
                  playSfx("BlipUp");
                  setIsMenuOpen(true);
                }}
              />
            </Stack>
          </Stack>
          <MainMenu open={isMenuOpen} setOpen={setIsMenuOpen} />
        </>
      )}
    </Stack>
  );
};
