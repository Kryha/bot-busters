import React, { type FC } from "react";
import { useRouter } from "next/router.js";
import { signOut } from "next-auth/react";
import { Stack } from "@mui/material";

import { text } from "~/assets/text/index.js";
import { api } from "~/utils/api.js";
import { pages } from "~/router.js";

import { styles } from "./styles.js";
import { MenuOptionsButton } from "~/components/menu-options-button/index.js";
import { useBBWallet } from "~/service/bb-wallet.js";

interface Props {
  handleClose: () => void;
}

export const MenuOptions: FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const join = api.lobby.join.useMutation();
  const {
    isConnected,
    isConnecting,
    disconnect: disconnectWallet,
  } = useBBWallet();

  const logOut = async () => {
    await signOut();
    await disconnectWallet();
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
    handleClose();
  };

  return (
    <Stack sx={styles.menuButtonContainer}>
      <MenuOptionsButton
        disabled={join.status === "loading"}
        // TODO: LOGIN the user with anonymous account
        onClick={() => handleNavigation(pages.lobby)}
      >
        {text.general.playNewGame}
      </MenuOptionsButton>
      <MenuOptionsButton onClick={() => handleNavigation(pages.playerProfile)}>
        {text.general.playerProfile}
      </MenuOptionsButton>
      <MenuOptionsButton onClick={() => handleNavigation(pages.leaderboard)}>
        {text.general.dailyLeaderboard}
      </MenuOptionsButton>
      <MenuOptionsButton onClick={() => handleNavigation(pages.howToPlay)}>
        {text.general.howToPlay}
      </MenuOptionsButton>
      {isConnected || isConnecting ? (
        <MenuOptionsButton onClick={() => void logOut()}>
          {text.general.signOut}
        </MenuOptionsButton>
      ) : (
        <MenuOptionsButton onClick={() => handleNavigation(pages.login)}>
          {text.general.connectWallet}
        </MenuOptionsButton>
      )}
      <MenuOptionsButton onClick={() => handleNavigation(pages.about)}>
        {text.general.about}
      </MenuOptionsButton>
    </Stack>
  );
};
