import { type FC } from "react";
import { Stack, Typography } from "@mui/material";

import { useRouter } from "next/router.js";
import { pages } from "~/router.js";
import { NavbarMenuButton } from "~/components/main-menu/index.js";
import { AudioSettings } from "~/components/audio-settings/index.js";
import { text } from "~/assets/text/index.js";
import { BotBustersIcon, UserIcon } from "~/assets/icons/index.js";
import { api } from "~/utils/api.js";
import { usePlaySFX } from "~/hooks/sounds.js";
import { LogoButton } from "~/components/logo-button/index.js";
import { styles } from "~/components/main-menu/styles.js";

interface Props {
  handleClose: () => void;
}

export const NavbarMenu: FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const playSfx = usePlaySFX();
  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const handleNavigation = (path: string) => {
    playSfx("NavClick");
    void router.push(path);
    handleClose();
  };

  return (
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
      <LogoButton
        variant="text"
        sx={styles.mainLogo}
        onClick={() => {
          playSfx("BlipUp");
          {
            router.pathname === pages.home
              ? handleClose()
              : void router.push(pages.home);
          }
        }}
      >
        <BotBustersIcon />
      </LogoButton>
      <Stack direction={"row"} rowGap={2} sx={styles.navbarEnd}>
        <AudioSettings />
        <NavbarMenuButton sx={styles.button} onClick={handleClose} />
      </Stack>
    </Stack>
  );
};
