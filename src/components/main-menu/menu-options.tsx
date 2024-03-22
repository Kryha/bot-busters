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
import { isVerifiedUser } from "~/utils/user.js";
import { EMPTY_RES } from "~/constants/main.js";

interface Props {
  handleClose: () => void;
}

export const MenuOptions: FC<Props> = ({ handleClose }) => {
  const router = useRouter();
  const join = api.lobby.join.useMutation();
  const { disconnect: disconnectWallet } = useBBWallet();
  const match = api.match.getOngoingMatch.useQuery();

  const user = api.user.getLoggedUser.useQuery(undefined, {
    retry: false,
  });

  const logOut = async () => {
    await signOut();
    await disconnectWallet();
  };

  const handleNavigation = (path: string) => {
    void router.push(path);
    handleClose();
  };

  const handleGoToMatch = async () => {
    if (match.isLoading || !match.data || match.data === EMPTY_RES) return;

    await router.push({
      pathname: pages.match,
      query: { roomId: match.data.id },
    });

    handleClose();
  };

  return (
    <Stack sx={styles.menuButtonContainer}>
      {match.data && match.data !== EMPTY_RES ? (
        <MenuOptionsButton
          disabled={join.status === "loading"}
          onClick={() => void handleGoToMatch()}
        >
          {text.homepage.continueGame}
        </MenuOptionsButton>
      ) : (
        <MenuOptionsButton
          disabled={join.status === "loading"}
          // TODO: LOGIN the user with anonymous account
          onClick={() => handleNavigation(pages.lobby)}
        >
          {text.general.playNewGame}
        </MenuOptionsButton>
      )}
      <MenuOptionsButton onClick={() => handleNavigation(pages.playerProfile)}>
        {text.general.playerProfile}
      </MenuOptionsButton>
      <MenuOptionsButton onClick={() => handleNavigation(pages.leaderboard)}>
        {text.general.leaderboard}
      </MenuOptionsButton>
      <MenuOptionsButton onClick={() => handleNavigation(pages.howToPlay)}>
        {text.general.howToPlay}
      </MenuOptionsButton>
      <MenuOptionsButton onClick={() => handleNavigation(pages.about)}>
        {text.general.about}
      </MenuOptionsButton>
      {isVerifiedUser(user.data) ? (
        <MenuOptionsButton onClick={() => void logOut()}>
          {text.general.signOut}
        </MenuOptionsButton>
      ) : (
        <MenuOptionsButton onClick={() => handleNavigation(pages.login)}>
          {text.general.connectWallet}
        </MenuOptionsButton>
      )}
    </Stack>
  );
};
