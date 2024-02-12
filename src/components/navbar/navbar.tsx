import { type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { MenuButton } from "~/components/main-menu/menu-button.jsx";
import { MainMenu } from "~/components/main-menu/index.js";
import { AudioSettings } from "~/components/audio-settings/index.js";

import { BotBustersIcon, UserIcon } from "~/assets/icons/index.js";
import { pages } from "~/router.js";
import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";

import { styles } from "./styles.js";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Navbar: FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();
  const loggedUser = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const handleNavigation = (path: string) => {
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
        <Stack direction={"row"} rowGap={2} sx={styles.navbarEnd}>
          <AudioSettings />
          <MenuButton sx={styles.button} onClick={() => setOpen(true)} />
        </Stack>
      </Stack>
      <MainMenu open={open} setOpen={setOpen} />
    </Stack>
  );
};
